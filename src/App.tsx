import './App.css'
import { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { Card } from './components/Card/Card';
import CircularProgress from '@mui/material/CircularProgress';
import { getPersons } from './services/starWarsService';

export type Person = {
  name: string;
  eye_color: string;
  height: string;
}

function App() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    'persons',
    ({ pageParam = '1' }) => getPersons(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage ? lastPage.next : undefined
    }
  );

  useEffect(() => {
    let fetching = false;
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div className='app-container'>
        {data?.pages.map(page => {
          if (!page) return;
          return page.results.map((person:Person) => <Card key={person.name} person={person} />)
        })}
      </div>
      {isFetchingNextPage && <div className='loader'><CircularProgress className='loader' color="secondary" /></div>}
    </>
  )
}

export default App;