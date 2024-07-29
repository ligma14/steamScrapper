// TODO: Implement a proper search component 26.07.24
// TODO: In line(14) optimize the nested map() function 26.07.24

const navbar = () => {
  return (
    <header className='w-full py-5 sm:px-10 px-5 flex justify-between flex-row items-center'>
      <nav className='flex w-full screen-max-width'>
        <div>
          <img src='/logo-stsc.svg' alt='logo' />
        </div>
        <ul className='flex flex-1 justify-center max-sm:hidden'>
          {['Blog','Docs','Contact me','Showcase'].map((nav)=>(
            <a href='https://github.com/ligma14/steamScrapper' key={nav} className='px-6 text-sm cursor-pointer text-gray-500 hover:text-white transition-all'>
              {nav}
            </a>
          ))}
        </ul>
        <ul className='flex items-center gap-7 max-sm:justify-end max-sm:flex-1 cursor-pointer'>
          <li><a href="https://github.com/ligma14/steamScrapper"><img src="/search.svg" alt="" /></a></li>
          <li className='opacity-50 hover:opacity-100 transition-all'><a href="https://github.com/ligma14/steamScrapper"><img src="/github.svg" alt="" /></a></li>
        </ul>
      </nav>
    </header>
  )
}

export default navbar