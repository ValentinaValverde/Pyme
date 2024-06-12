import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Box, Button } from '@mui/material';
import StoreStoryForm from '@/components/create-forms/StoreStoryForm';
import { getStoreStory } from '@/utils/actions/storeActions';
import Link from 'next/link';
import CreateStoreStoryForm from '@/components/create-forms/CreateStoreStoryForm';
import ShopHeader from '@/components/shop/ShopHeader';

const MyStoreHome = async ({ params }: { params: any }) => {
  const slug = params.slug?.toString() || '';
  const story = await getStoreStory(slug);

  if (story) {
    return (
      <>
        <Box sx={{ display: 'flex' }}>
          <Sidebar storeSlug={slug} />
          <Box component={'main'} sx={{ flexGrow: 1, p: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
              }}
            >
              {/* <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ flex: '1 1', p: 1 }}>
                  {story.storeImage && (
                    <img
                      loading="lazy"
                      src={story.storeImage}
                      alt="Store Image"
                      className="max-w-lg max-h-96"
                    />
                  )}
                </Box>
                <Box sx={{ flex: '1 1', p: 1 }}>
                  <div>
                    <h1 style={{ fontWeight: 'bold' }}>Our Story</h1>
                    <p>{story.storeDetails}</p>
                  </div>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ flex: '1 1', p: 1 }}>
                  <div>
                    <h1 style={{ fontWeight: 'bold' }}>Owner</h1>
                    <p>{story.ownerDetails}</p>
                  </div>
                </Box>
                <Box sx={{ flex: '1 1', p: 1 }}>
                  {story.storeImage && (
                    <img
                      loading="lazy"
                      src={story.ownerImage}
                      alt="Store Owner Image"
                      className="max-w-lg max-h-96"
                    />
                  )}
                </Box>
              </Box> */}

              <div>
                <div>
                  <img
                    src={story?.storeImage}
                    alt="Store Image"
                    className="shop_image"
                  />
                </div>
                <div className="shop_info">
                  {/* <p className="title">{storeName}</p> */}
                  <p>{story?.storeDetails}</p>
                </div>

                <div className="owner_info_container">
                  <div>
                    <img
                      src={story?.ownerImage}
                      alt="Shop Owner Image"
                      className="owner_image"
                    />
                  </div>
                  <div className="container">
                    {/* in the future I'd like to have the owners name below */}
                    {/* example: "About John Smith" */}
                    <p className="about_owner_title">About the Owner</p>
                    <p>{story?.ownerDetails}</p>
                  </div>
                </div>
              </div>

              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ flex: '1 1', p: 1 }}>
                  <Link href={`/mystore/${slug}/story/edit`}>
                    <button
                      //   variant="contained"
                      //   style={{ backgroundColor: '#04724d', color: 'white' }}
                      className="unfilled_button"
                    >
                      Edit Story
                    </button>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Sidebar storeSlug={slug} />
        <Box component={'main'} sx={{ flexGrow: 1, p: 3 }}>
          <StoreStoryForm story={story} myStore={slug} />
          =======
          <CreateStoreStoryForm myStore={slug} />
          <Button variant="contained" color="primary">
            Create New Story
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default MyStoreHome;
