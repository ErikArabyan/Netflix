import { useEffect, useState, ChangeEvent } from 'react'
import styles from './style.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { logoutAPI } from '../../features/logoutAPI/logoutAPI'
import { setSearch } from '../../features/filmsAPI/filmSlice'
import { userClear } from '../../features/userAPI/userSlice'
import { useStringContext } from '../../main'
import { userAPI } from '../../features/userAPI/userAPI'
import { AppDispatch, AppSelector } from '../../application/store'
import { Netflix } from '../svgs/Netflix'
import { N } from '../svgs/N'
import { Search } from '../svgs/search'
import { QR } from '../svgs/QR'
import { DropDownArrow } from '../svgs/dropDownArrow'


export const Header = () => {
	const { backend } = useStringContext()
	const navigate = useNavigate()
	const dispatch = AppDispatch()
	const user = AppSelector(state => state.userAPI)	
	const [show, setShow] = useState(true)
	const [search, setSearchStyle] = useState(false)
    
	useEffect(() => {
		const fetchUserData = async () => {
			dispatch(userAPI())
		}
		fetchUserData()
	}, [])

	const logout = () => {
		dispatch(logoutAPI())
			.unwrap()
			.then(() => {
				navigate('/auth/login/')
				dispatch(userClear())
			})
	}

	const searchfunc = (data: ChangeEvent<HTMLInputElement>) => dispatch(setSearch(data.target.value))
	

	const qrHandle = () => navigate('/auth/login-by-qr')
	

	return (
		<header className={user?.username ? styles.loggedIn : document.cookie.split('; ').find(row => row.startsWith('token='))?.length ? styles.loggedIn : styles.header}>
			<div className={styles.headerInner}>
				<div>
					<NavLink className={styles.logoLink} to={'/'}>
						<Netflix />
						<N />
					</NavLink>
				</div>

				{user?.username ? (
					<div className={styles.right}>
						<input className={[styles.searchDefault, search ? styles.searchOpen : styles.searchClose].join(' ')} type='search' onChange={data => searchfunc(data)} />
						<button className={styles.searchButton} onClick={() => setSearchStyle(search ? false : true)}>
							<Search />
						</button>
						<div className={styles.profile} onClick={() => setShow(show ? false : true)}>
							<img src={user.image.includes('https') ? `${user.image}` : `${backend}/media/${user.image}`} className={styles.profileImage} alt='' />
							<DropDownArrow/>
						</div>
						<div onClick={() => setShow(show ? true : true)} className={[styles.dropdown, show ? [styles.show, styles.disable].join(' ') : ''].join(' ')}>
							<div className={[styles.innertext, styles.cursor].join(' ')}>
								<h4>{user.username}</h4>
								<h4>Manage Profiles</h4>
							</div>
							<hr className={styles.line} />
							<div className={[styles.innertext, styles.cursor].join(' ')}>
								<h4 onClick={qrHandle} className={styles.qrlink}>
									<span>
										<QR/>
									</span>{' '}
									<span className={styles.qrText}>Link Desktop Device</span>
								</h4>
								<h4 onClick={logout}>Sign out of Netflix</h4>
							</div>
						</div>
					</div>
				) : document.cookie.split('; ').find(row => row.startsWith('token=')) ? (
					<></>
				) : (
					<div className={styles.right}>
						<p className={styles.headerText}>UNLIMITED TV SHOWS & MOVIES</p>
						<NavLink to={'/auth/register/'}>
							<button className='nbutton'>Join Now</button>
						</NavLink>
						<NavLink to={'/auth/login/'}>
							<button className={styles.authLinks}>Sign In</button>
						</NavLink>
					</div>
				)}
			</div>
		</header>
	)
}
