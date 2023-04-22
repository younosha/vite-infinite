import './App.css'
import { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { Card } from './components/Card/Card';
import { getPersons } from './services/starWarsService';
import { Loader } from './components/Loader/Loader';

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
    const onScroll = async () => {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
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
      {isFetchingNextPage && <Loader/>}
    </>
  )
}

export default App;