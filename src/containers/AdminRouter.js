import React, { Suspense } from 'react';
import Admin from './Admin';
import { Route } from 'react-router-dom';

//Providers
const VideoProvider = React.lazy(() => import('../contexts/VideoContext'));
const PodcastProvider = React.lazy(() => import('../contexts/PodcastContext'));
const AccountProvider = React.lazy(() => import('../contexts/AccountContext'));
const AvatarProvider = React.lazy(() => import('../contexts/AvatarContext'));
const ActivityProvider = React.lazy(() => import('../contexts/ActivityContext'));

//Containers
const VideosContainer = React.lazy(() => import('./VideosContainer'));
const PodcastsContainer = React.lazy(() => import('./PodcastsContainer'));
const AccountsContainer = React.lazy(() => import('./AccountsContainer'));
const ActivitiesContainer = React.lazy(() => import('./ActivitiesContainer'));

const AdminRouter = () => (
  <Admin>
    <Suspense fallback={<div>Loading...</div>}>
      <AccountProvider>
        <AvatarProvider>
          <Route path="/admin/accounts" component={AccountsContainer} />
        </AvatarProvider>
      </AccountProvider>
      <VideoProvider>
        <Route path="/admin/videos" component={VideosContainer} />
      </VideoProvider>
      <PodcastProvider>
        <Route path="/admin/podcasts" component={PodcastsContainer} />
      </PodcastProvider>
      <ActivityProvider>
        <Route path="/admin/activities" component={ActivitiesContainer} />
      </ActivityProvider>
    </Suspense>
  </Admin>
)

export default AdminRouter;