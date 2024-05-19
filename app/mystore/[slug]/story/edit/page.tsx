import React from 'react';
import StoreStoryForm from '@/components/create-forms/StoreStoryForm';
import { getStoreStory } from '@/utils/actions/storeActions';
import Sidebar from '@/components/Sidebar';
import { Box, Button } from '@mui/material';

const editStoryPage = async ({ params }: { params: any }) => {
  const slug = params.slug?.toString() || '';
  const story = await getStoreStory(params.slug);
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Sidebar storeSlug={slug} />
        <Box component={'main'} sx={{ flexGrow: 1, p: 3 }}>
          <StoreStoryForm story={story} myStore={slug} />
        </Box>
      </Box>
    </>
  );
};

export default editStoryPage;
