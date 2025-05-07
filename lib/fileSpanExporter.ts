// lib/fileSpanExporter.ts
import fs from 'fs';
import { SpanExporter, ReadableSpan } from '@opentelemetry/sdk-trace-base';
import { ExportResult, ExportResultCode } from '@opentelemetry/core';

export class FileSpanExporter implements SpanExporter {
  private stream = fs.createWriteStream('./logs/traces.log', { flags: 'a' });

  export(spans: ReadableSpan[], resultCallback: (result: ExportResult) => void): void {
    for (const span of spans) {
      const record = {
        traceId: span.spanContext().traceId,
        spanId: span.spanContext().spanId,
        name: span.name,
        startTime: span.startTime,
        endTime: span.endTime,
        attributes: span.attributes,
        status: span.status,
      };
      this.stream.write(JSON.stringify(record) + '\n');
    }
    resultCallback({ code: ExportResultCode.SUCCESS });
  }

  shutdown(): Promise<void> {
    this.stream.end();
    return Promise.resolve();
  }
}
