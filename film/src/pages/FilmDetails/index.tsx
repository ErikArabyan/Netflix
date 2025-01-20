import { useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { filmDetailsAPI } from '../../features/filmDetailsAPI/filmDetailsAPI'
import styles from './style.module.css'
import { Star } from './star'
import { payForFilmAPI } from '../../features/payForFilmAPI/payForFilmAPI'
import { useStringContext } from '../../main'
import { AppDispatch, AppSelector } from '../../application/store'
import { Marker } from '../../components/svgs/Marker'

interface Film {
	name: string
	image: string
	release_date: string
	budget: number
	genres: string[]
	film: string[]
	art_directors: string[]
	cinematography: string[]
	directors: string[]
	distributed_by: string[]
	editors: string[]
	nominations: string[]
	rate: string[]
}

interface FilmDetailsState {
	film: Film | null
}

interface FilmDetailsRequest {
	id: string
	filmname: string
}

export const FilmDetails = () => {
	const params = useParams<{ id: string }>()
	const dispatch = AppDispatch()
	const { film }: FilmDetailsState = AppSelector(state => state.filmdetailsAPI as FilmDetailsState)
	console.log(film);
	
	const video = useRef<HTMLVideoElement>(null)
	const container = useRef<HTMLDivElement>(null)
	const { backend } = useStringContext()

	const filmDetailsRequest: FilmDetailsRequest = {
		id: params.id || '',
		filmname: 'defaultFilmName',
	}

	useEffect(() => {
		if (filmDetailsRequest.id) {
			dispatch(filmDetailsAPI(filmDetailsRequest))
				.unwrap()
				.then(() => {
					if (video.current && container.current) {
						const videoHeight = video.current.offsetHeight
						if (videoHeight) {
							container.current.style.height = `${videoHeight}px`
						}
					}
				})
		}
	}, [])

	const pay = () => {
		dispatch(payForFilmAPI(filmDetailsRequest.id))
	}

	return (
		<div className={styles.main}>
			<img alt='' src='https://occ-0-3924-2774.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABUCGlKqeW1XFShPS8Ev5o4jbqQw4NlYkE5X8amr47IoNJDB1XVUGPgtFx9sKLoSgRfIM0KlEAWjdLdjRdw5u04nhWB-UtdsA7EAI.webp?r=111' srcSet='https://occ-0-3924-2774.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABTgLZ6ScKFS6wNWjGDei78Kwv-x_VLCtz0nrUA-OFI7XK30lpSToNxDiQO9PaOGpV1TvdCM9HrmPdliu76SxZcao1479P66N9M0I.webp?r=111 960w, https://occ-0-3924-2774.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABTreeFnA2oudY6olpl0UksrOA6lgoCXdeMUfNPJ2EJhuCaYb4p-6h-LyIUBMbmqimoDnHf-O3gTasVnRdoAaZ89BlC_r-myRTiX5.webp?r=111 1260w, https://occ-0-3924-2774.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABUCGlKqeW1XFShPS8Ev5o4jbqQw4NlYkE5X8amr47IoNJDB1XVUGPgtFx9sKLoSgRfIM0KlEAWjdLdjRdw5u04nhWB-UtdsA7EAI.webp?r=111 1920w' className={styles.d153nli6} />
			<video muted playsInline={true} poster='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' className={styles.video}>
				<source src='https://occ-0-3924-2774.1.nflxso.net/so/soa6/676/1714408724375367681.mp4?v=1&amp;e=1737361354&amp;t=EeBH39mLP2e5UbcqI4Tzs1GjrQM' type='video/mp4' />
			</video>
			<div className={styles.d11en623}>
				<div className={styles.dppqefh}>
					<div className={styles.drloyte}>
						<div className={styles.djosj09}>
							<video muted src='https://occ-0-3924-2774.1.nflxso.net/so/soa6/676/1714408724375367681.mp4?v=1&amp;e=1737361354&amp;t=EeBH39mLP2e5UbcqI4Tzs1GjrQM' preload='auto' poster='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' className={styles.d1uvi23e} autoPlay={true}></video>
							<img src='https://occ-0-3924-2774.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABUCGlKqeW1XFShPS8Ev5o4jbqQw4NlYkE5X8amr47IoNJDB1XVUGPgtFx9sKLoSgRfIM0KlEAWjdLdjRdw5u04nhWB-UtdsA7EAI.webp?r=111' srcSet='https://occ-0-3924-2774.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABTgLZ6ScKFS6wNWjGDei78Kwv-x_VLCtz0nrUA-OFI7XK30lpSToNxDiQO9PaOGpV1TvdCM9HrmPdliu76SxZcao1479P66N9M0I.webp?r=111 960w, https://occ-0-3924-2774.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABTreeFnA2oudY6olpl0UksrOA6lgoCXdeMUfNPJ2EJhuCaYb4p-6h-LyIUBMbmqimoDnHf-O3gTasVnRdoAaZ89BlC_r-myRTiX5.webp?r=111 1280w, https://occ-0-3924-2774.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABUCGlKqeW1XFShPS8Ev5o4jbqQw4NlYkE5X8amr47IoNJDB1XVUGPgtFx9sKLoSgRfIM0KlEAWjdLdjRdw5u04nhWB-UtdsA7EAI.webp?r=111 1920w' alt='' className={styles.d1mzb3b8} />
							<div className={styles.dvglbum}></div>
						</div>
						<div className={styles.d4c5682}>
							<div className={styles.d15g54dn}>
								<div className={styles.d1b4a1ef}>
									<div className={styles.deebncd}>
										<div className={styles.d2rfcwr}>
											<span className={styles.d2rfcwr}>
												<button title='Pause' className={[styles.pressable_styles__a6ynkg0, styles.button_styles__1kwr4ym0, styles.d1w0d8o6].join(' ')} role='button' type='button'>
													<div aria-hidden='true' className={styles.dmzvhg6}>
														<svg xmlns='http://www.w3.org/2000/svg' fill='none' role='img' viewBox='0 0 24 24' width='24' height='24' aria-hidden='true'>
															<path d='M4.5 3C4.22386 3 4 3.22386 4 3.5V20.5C4 20.7761 4.22386 21 4.5 21H9.5C9.77614 21 10 20.7761 10 20.5V3.5C10 3.22386 9.77614 3 9.5 3H4.5ZM14.5 3C14.2239 3 14 3.22386 14 3.5V20.5C14 20.7761 14.2239 21 14.5 21H19.5C19.7761 21 20 20.7761 20 20.5V3.5C20 3.22386 19.7761 3 19.5 3H14.5Z' fill='currentColor'></path>
														</svg>
													</div>
												</button>
											</span>
											<span className={styles.d2rfcwr}>
												<button title='Unmute' className={[styles.pressable_styles__a6ynkg0, styles.button_styles__1kwr4ym0, styles.d1w0d8o6].join(' ')} role='button' type='button'>
													<div aria-hidden='true' className={styles.dmzvhg6}>
														<svg xmlns='http://www.w3.org/2000/svg' fill='none' role='img' viewBox='0 0 24 24' width='24' height='24' aria-hidden='true'>
															<path d='M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM15.2929 9.70714L17.5858 12L15.2929 14.2929L16.7071 15.7071L19 13.4142L21.2929 15.7071L22.7071 14.2929L20.4142 12L22.7071 9.70714L21.2929 8.29292L19 10.5858L16.7071 8.29292L15.2929 9.70714Z' fill='currentColor'></path>
														</svg>
													</div>
												</button>
											</span>
										</div>
										<div className={styles.d2rfcwr}>
											<span className={styles.d2rfcwr}>
												<button title='Expand' className={[styles.pressable_styles__a6ynkg0, styles.button_styles__1kwr4ym0, styles.d1w0d8o6].join(' ')} role='button' type='button'>
													<div aria-hidden='true' className={styles.dmzvhg6}>
														<svg xmlns='http://www.w3.org/2000/svg' fill='none' role='img' viewBox='0 0 24 24' width='24' height='24' aria-hidden='true'>
															<path d='M0 5C0 3.89543 0.895431 3 2 3H9V5H2V9H0V5ZM22 5H15V3H22C23.1046 3 24 3.89543 24 5V9H22V5ZM2 15V19H9V21H2C0.895431 21 0 20.1046 0 19V15H2ZM22 19V15H24V19C24 20.1046 23.1046 21 22 21H15V19H22Z' fill='currentColor'></path>
														</svg>
													</div>
												</button>
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.d1mlxn48}>
						<div className={styles.dkiz1b3}>
							<h2 className={styles.d11jsu7c}>Fast X</h2>
							<div className={styles.d56ff39}>
								<ul className={styles.d1xty6x8}>
									<li className={styles.d1payn3k}>2023</li>
									<li className={styles.d1payn3k}>⁨13+⁩</li>
									<li className={styles.d1payn3k}>Action</li>
								</ul>
							</div>
							<div className={styles.d18fxwnx}>
								<div className={styles.d1y7pnva}>
									<span className={styles.dv92n84}>Dom Toretto faces his most dangerous challenge yet as he races to save his family from a nemesis with a vicious grudge and a serious case of road rage.</span>
								</div>
								<div className={styles.d1mulv68} role='separator'>
									<div className={styles.d1k8qwhc}></div>
								</div>
								<div className={styles.d1wmy9hl}>
									<div className={styles.deywhmi}>
										<span className={styles.dn5k3ig}>Starring:</span> <span className={styles.d3z6sz6}>Vin Diesel, Michelle Rodriguez, Tyrese Gibson</span>
									</div>
								</div>
							</div>
						</div>

						<div>
							<h2 className={styles.subheader}>More Details</h2>
							<div className={styles.information}>
								<div className={styles.informationCart}>
									<div>
										<h4>Watch offline</h4>
										<span className={styles.d1npkg09}>Available to download</span>
									</div>
									<div>
										<h4>Genres</h4>
										<span className={styles.d1npkg09}>Action Adventure Movies</span>
									</div>
									<div>
										<h4>This show is ...</h4>
										<span className={styles.d1npkg09}>Slick, Exciting, Adventure, Ensemble, Daredevils, Hollywood Movie, Cars, Action Thriller</span>
									</div>
								</div>

								<div className={styles.informationCart}>
									<div>
										<h4>Audio</h4>
										<span className={styles.d1npkg09}>English - Audio Description, English [Original], Russian</span>
									</div>
									<div>
										<h4>Subtitles</h4>
										<span className={styles.d1npkg09}>English, Russian</span>
									</div>
								</div>

								<div className={styles.informationCart}>
									<div>
										<h4>Cast</h4>
										<span className={styles.d1npkg09}>Vin Diesel, Michelle Rodriguez, Tyrese Gibson, Ludacris, John Cena, Jason Momoa, Nathalie Emmanuel, Jordana Brewster, Jason Statham, Sung Kang</span>
									</div>
								</div>
							</div>
						</div>

						<div>
							<h2 className={styles.subheader}>A Plan To Suit Your Needs</h2>
							<div className={styles.information}>
								<div className={styles.pricingCart}>
									<div className={styles.d310kvi}>
										<div className={styles.StyledItem1}>
											<h3 className={styles.d15sgz0v}>Basic</h3>
										</div>
										<div className={styles.StyledItem2}>
											<h2 className={styles.duxdvfx}>720p</h2>
										</div>
										<div className={styles.StyledItem3}>
											<p className={styles.d1470p5}>
												<Marker />
												Good video quality
											</p>
										</div>
										<div className={styles.StyledItem3}>
											<p className={styles.d1470p5}>
												<Marker />
												For your phone, tablet, laptop and TV
											</p>
										</div>
										<div className={styles.StyledItem4}>
											<p className={styles.d55kstt}>EUR 9.99 /mo</p>
										</div>
									</div>
								</div>
								<div className={styles.pricingCart}>
									<div className={styles.d9yiet8}>
										<div className={styles.StyledItem1}>
											<h3 className={styles.d15sgz0v}>Standard</h3>
										</div>
										<div className={styles.StyledItem2}>
											<h2 className={styles.duxdvfx}>1080p</h2>
										</div>
										<div className={styles.StyledItem3}>
											<p className={styles.d1470p5}>
												<Marker />
												Great video quality
											</p>
										</div>
										<div className={styles.StyledItem3}>
											<p className={styles.d1470p5}>
												<Marker />
												For your phone, tablet, laptop and TV
											</p>
										</div>
										<div className={styles.StyledItem4}>
											<p className={styles.d55kstt}>EUR 9.99 /mo</p>
										</div>
									</div>
								</div>
								<div className={styles.pricingCart}>
									<div className={styles.dlvx2qm}>
										<div className={styles.StyledItem1}>
											<h3 className={styles.d15sgz0v}>Premium</h3>
										</div>
										<div className={styles.StyledItem2}>
											<h2 className={styles.duxdvfx}>4K + HDR</h2>
										</div>
										<div className={styles.StyledItem3}>
											<p className={styles.d1470p5}>
												<Marker />
												Best video quality
											</p>
										</div>
										<div className={styles.StyledItem3}>
											<p className={styles.d1470p5}>
												<Marker />
												Immersive sound (spatial audio)
											</p>
										</div>
										<div className={styles.StyledItem3}>
											<p className={styles.d1470p5}>
												<Marker />
												For your phone, tablet, laptop and TV
											</p>
										</div>
										<div className={styles.StyledItem4}>
											<p className={styles.d55kstt}>EUR 11.99 /mo</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
