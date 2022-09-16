import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar(){
    return(
        <header>
            <nav className='bg-orange-200 flex pl-2 pr-2 justify-between items-stretch'>
                <Link to='/' className='text-3xl'>Home</Link>
                <ul className='flex gap-x-4 text-lg'>
                    {/* <li className='hover:bg-gradient-to-r from-purple-400 to-pink-600'>
                        <a href='/Atletas' className='pl-1 pr-1'>Atletas</a>
                    </li>
                    <li>
                        <a href='/Estadisticas'>Estadísticas</a>
                    </li>
                    <li>
                        <a href='/login'>Login</a>
                    </li> */}
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
    return(
        <li className={isActive ? 'active:font-extrabold' : ''}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    );
}
