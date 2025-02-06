import { PageLoad } from "./components/Pageload"
import { AppSelector } from './application/store'

export const App = () => {
	const isloading = AppSelector(state => state.loading)
	return (
		<div>
			<PageLoad isloading={isloading} />
		</div>
	)
}
