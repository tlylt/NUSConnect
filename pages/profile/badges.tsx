import Head from 'next/head'
import SidebarLayout from '../../components/common/SidebarLayout'
import Badges from '../../components/profile/Badges'

export default function Badge(): JSX.Element {
  return (
    <SidebarLayout>
      <Head>
        <title>Badges | NUS Connect</title>
        <meta name="description" content="NUS Connect" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-full h-full">
        <Badges />
      </div>
    </SidebarLayout>
  )
}
