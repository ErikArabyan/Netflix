import { useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { filmDetailsAPI } from '../../features/filmDetailsAPI/filmDetailsAPI'
import styles from './style.module.css'
import { Star } from './star'
import { payForFilmAPI } from '../../features/payForFilmAPI/payForFilmAPI'
import { useStringContext } from '../../main'
import { AppDispatch, AppSelector } from '../../application/store'

interface Film {
	name: string
	image: string
	film: string[]
}

interface FilmDetailsState {
	filmdetailsAPI: {
		film: Film | null
	}
}

interface FilmDetailsRequest {
	id: string
	filmname: string
}

export const FilmDetails = () => {
	const params = useParams<{ id: string }>()
	const dispatch = AppDispatch()
	const { film } = AppSelector((state: FilmDetailsState) => state.filmdetailsAPI)
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
	}, [filmDetailsRequest, dispatch])

	const pay = () => {
		dispatch(payForFilmAPI(filmDetailsRequest.id))
	}

	return (
		<div className={styles.fd}>
			{film?.name && film.film?.[0] ? (
				<div>
					<img className={styles.fdImg} src={`${backend}/${film.image}`} alt='Film' />
					<div className={styles.fon}></div>
					<div className={styles.videoContainer}>
						<div className={styles.videoContainerInnder} ref={container}>
							<video className={styles.videoFon} autoPlay muted loop ref={video}>
								<source src={`${backend}/${film.film[0]}`} type='video/mp4' />
							</video>
							<video className={styles.video} autoPlay muted loop controls>
								<source src={`${backend}/${film.film[0]}`} type='video/mp4' />
							</video>
						</div>
					</div>
					<div>
						<div className={styles.rating}>
							{[...Array(5)].map((_, i) => (
								<Star key={i} data={i + 1} />
							))}
						</div>
						<div>
							<button className='nbutton' onClick={pay}>
								buy the film
							</button>
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}
