const MENU_ITEMS = [
    { name: 'Home', href: '#' },
    { name: 'Activities', href: '#' },
    { name: 'Profile', href: '#' },
]

function Navbar() {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="logo">
                <h1 className="text-white text-xl font-bold">Activity System</h1>
            </div>

            <ul className="flex space-x-4">
               {MENU_ITEMS.map((item, index) => (
                    <li key={index}>
                        <a href={item.href} className="text-white hover:text-gray-400">
                            {item.name}
                        </a>
                    </li>)
                )}
            </ul>
        </nav>
    )
}

export default Navbar;