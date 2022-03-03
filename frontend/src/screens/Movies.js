import { useEffect, useState } from 'react';

import Page from '../components/Page';
import MovieList from '../components/MovieList';

export default function Movies() {

    return (
        <Page title="Movies">
            <MovieList />
        </Page>
    )
}