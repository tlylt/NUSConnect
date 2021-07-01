import Head from 'next/head'
import SidebarLayout from '../../components/layouts/SidebarLayout'
import ModuleCards from '../../components/profile/ModuleCards'
import ProfileHeader from '../../components/profile/ProfileHeader'

export default function Profile(): JSX.Element {
  return (
    <div className="dark:bg-gray-800">
      <SidebarLayout>
        <Head>
          <title>Profile | NUS Connect</title>
          <meta name="description" content="NUS Connect" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex flex-col w-full h-full ">
          <ProfileHeader />
          <ModuleCards />
        </div>
      </SidebarLayout>
    </div>
  )
}
