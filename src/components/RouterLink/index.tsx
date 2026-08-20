import { Link } from "react-router";

type routerLinkProps = {
    children: React.ReactNode
    href: string
} & React.ComponentProps<'a'>;

export function RouterLink({children, href, ...props}: routerLinkProps){

    return <Link to={href} {...props}>{children}</Link>

}