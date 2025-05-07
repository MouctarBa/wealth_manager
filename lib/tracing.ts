// lib/tracing.ts
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { FileSpanExporter } from './fileSpanExporter';

const sdk = new NodeSDK({
  traceExporter: new FileSpanExporter(),
  instrumentations: [getNodeAutoInstrumentations()],
});

try {
  sdk.start();
  console.log('Tracing → writing spans to logs/traces.log');
} catch (err) {
  console.error('Tracing failed to start', err);
}
