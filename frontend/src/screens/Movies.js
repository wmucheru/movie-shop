import Page from '../components/Page';
import MovieList from '../components/MovieList';

export default function Movies() {

    return (
        <Page title="Movies" bodyClass="movies-bd">
            <MovieList />
        </Page>
    )
}