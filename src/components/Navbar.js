import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar(){
    return(
        <header>
            <nav className='flex bg-orange-300 rounded-xl shadow-md overflow-hidden p-4 justify-between'>
                <Link to='/' className='font-bold hover:text-white text-xl'>Home</Link>
                <ul className='flex gap-4 text-lg'>
                    <Customlink to='/Atletas'>Atletas</Customlink>
                    <Customlink to='/Estadisticas'>Estadísticas</Customlink>
                    <Customlink to='/Login'>Login</Customlink>
                </ul>
            </nav>
        </header>
    );
}

function Customlink({to, children, ...props}){
    const resolvePath = useResolvedPath(to)
    const isActive = useMatch({path: resolvePath.pathname, end:true})
    let className = 'hover:text-white'
    if (isActive)
    {
        className += ' font-bold'
    }        
    return(
        <li className={className}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    );
}
