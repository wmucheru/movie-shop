import Page from '../components/Page';
import MovieList from '../components/MovieList';
import MovieForm from '../components/MovieForm';

export default function Admin() {

    return (
        <Page title="Admin">
            <MovieList />
            <MovieForm />
        </Page>
    );
}