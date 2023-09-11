import Header from "@/components/Header"
import NotificationsFeed from "@/components/NotificationFeed"
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"

const Notifications = () => {
    return (
        <>
            <Header label="notifications" showBackArrow />
            <NotificationsFeed />
        </>
    )
}

export default Notifications


export async function getServerSideProps(context : NextPageContext) {
    const session = await getSession(context)

    if (!session) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          }
        }
      }

    return {
        props : {
            session
        }
    }

}