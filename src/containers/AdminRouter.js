import React, { Suspense } from 'react';
import Admin from './Admin';
import { Route } from 'react-router-dom';

//Providers
const VideoProvider = React.lazy(() => import('../contexts/VideoContext'));
const PodcastProvider = React.lazy(() => import('../contexts/PodcastContext'));
const AccountProvider = React.lazy(() => import('../contexts/AccountContext'));

//Containers
const VideosContainer = React.lazy(() => import('./VideosContainer'));
const PodcastsContainer = React.lazy(() => import('./PodcastsContainer'));
const AccountsPage = React.lazy(() => import('../pages/AccountsPage'));

const AdminRouter = () => (
  <Admin>
    <Suspense fallback={<div>Loading...</div>}>
      <AccountProvider>
        <Route path="/admin/accounts" component={AccountsPage} />
      </AccountProvider>
      <VideoProvider>
        <Route path="/admin/videos" component={VideosContainer} />
      </VideoProvider>
      <PodcastProvider>
        <Route path="/admin/podcasts" component={PodcastsContainer} />
      </PodcastProvider>
    </Suspense>
  </Admin>
)

export default AdminRouter;