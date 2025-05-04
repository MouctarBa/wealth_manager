import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'

export default function Equity() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace('/')
      else setUser(data.session.user)
    })
  }, [])

  if (!user) return null

  return (
    <Layout>
      <h2 className="text-3xl font-semibold mb-6">Equity</h2>
      <Card>
        <p className="text-sm uppercase text-gray-500 mb-2">Equity Summary</p>
        <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          [Equity Chart Placeholder]
        </div>
      </Card>
    </Layout>
  )
}