import { useState } from 'react'
import { Link } from 'react-router-dom'
//@ts-ignore
import PopLogo from '../assets/pop.png'

const Home = () => {
  const [value, setValue] = useState('')
  return (
    <div>
      <div className='logo-container'>
        <img src={PopLogo} alt='lolipop' className='logo' />
      </div>
      <div className='ring'>
        <div className='outer-ring center'></div>
        <div className='inner-ring center'></div>
      </div>
      <div className='thread-input'>
        <form>
          <input
            className='input-thread'
            placeholder='Create a thread...'
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Link
            className='link'
            to={!value ? '/thread/main' : `/thread/${value}`}
          >
            <button
              className='Join-button'
              type='submit'
              onClick={() => setValue('')}
            >
              {!value ? 'Join main' : 'Create'}
            </button>
          </Link>
        </form>
        <div className='sub-container'>
          <h3>Join Popular threads..</h3>
        </div>
        <div className='Popular-button-container'>
          <Link to='/thread/main'>
            <button className='Popular-button'>main</button>
          </Link>
          <Link to='/thread/meow'>
            <button className='Popular-button'>meow</button>
          </Link>
          <Link to='/thread/anime'>
            <button className='Popular-button'>anime</button>
          </Link>
          <Link to='/thread/sudo'>
            <button className='Popular-button'>sudo</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
