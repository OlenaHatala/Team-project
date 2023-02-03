import PageContent from '../components/PageContent';

function HomePage() {
  const userData = localStorage.getItem('useData');
  console.log(userData);
  return (
    <PageContent title="Welcome!">
      <p>Browse all our amazing events!</p>
    </PageContent>
  );
}

export default HomePage;
