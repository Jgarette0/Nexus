<<<<<<< HEAD
## Project Deployment
This project is deployed and can be accessed at [Deployment Link](https://class-zone.onrender.com).

The app might run slow on the first load as it is deployed on a free plan.

## Getting Started

To get started, just clone the repository and run `npm install`:

    git clone https://github.com/mastermanav09/ClassZone.git
    npm install

    ## Dependencies


## This project relies on the following external services:

### MongoDB:

MongoDB is used as the database for storing and retrieving data.

### Cloudinary:

Cloudinary is used for managing and serving media assets such as images and files.

### Google Auth:

Used for Authentication.

## Setup

To run this project locally, you need to set up MongoDB, Cloudinary and Google O-Auth and provide the necessary API keys.

### MongoDB Setup

1. Install MongoDB on your machine.
2. Create a new MongoDB database for this project.

### Google Auth

1. Create your credentials here [Google API](https://console.cloud.google.com/apis).

### Cloudinary Setup

1. Sign up for a [Cloudinary account](https://cloudinary.com/users/register/free).
2. Obtain your Cloudinary API key, API secret, and cloud name.
3. Create a `.env` file in the project root and add the following information:

```env
MONGODB_URI=your_mongodb_connection_string
GOOGLE_ID=your_google_auth_id
GOOGLE_SECRET=your_google_auth_secret
SECRET=your_jwt_secret
NEXTAUTH_URL=your_base_url
NEXT_PUBLIC_NEXTAUTH_URL=your_base_url
NEXTAUTH_SECRET=your_next_auth_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
CLOUDINARY_URL=cloudinary://my_key:my_secret@my_cloud_name
UPLOAD_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/${my_cloud_name}/upload
```

## Running locally in development mode

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
=======
## Landing Page
This landing page is what users see first.

| Mobile View | Desktop View |
|-------------|--------------|
| <img src="nexus/LandingPage-mobile.png" alt="Mobile View" style="max-width: 100%; height: auto; border-radius: 10px; border: 1px solid gray;"> | <img src="nexus/LandingPage-web.png" alt="Desktop View" style="max-width: 100%; height: auto; border-radius: 10px; border: 1px solid gray;"> |
| <img src="nexus/LandingBody-mobile.png" alt="Mobile View" style="max-width: 100%; height: auto; border-radius: 10px; border: 1px solid gray;"> | <img src="nexus/LandingBody-web.png" alt="Desktop View" style="max-width: 100%; height: auto; border-radius: 10px; border: 1px solid gray;"> |

## Signin Page
This is the signin page.

|  | |
|-------------|--------------|
| <img src="nexus/signin-mobile.png" alt="Mobile View" style="max-width: 100%; height: auto; border-radius: 10px; border: 1px solid gray;"> | <img src="nexus/Signin-web.png" alt="Desktop View" style="max-width: 100%; height: auto; border-radius: 10px; border: 1px solid gray;"> |

## Home Page
The home page displayed when a user is Signed in.

|  | |
|-------------|--------------|
| <img src="nexus/HomePage-mobile.png" alt="Mobile View" style="max-width: 100%; height: auto; border-radius: 10px; border: 1px solid gray;"> | <img src="nexus/Homepage-web.png" alt="Desktop View" style="max-width: 100%; height: auto; border-radius: 10px; border: 1px solid gray;"> |

## Join Page
This section is where users join a club using a 5-7 alphanumeric code.

|  | |
|-------------|--------------|
| <img src="nexus/JoinClub-mobile.png" alt="Mobile View" style="max-width: 100%; height: auto; border-radius: 10px; border: 1px solid gray;"> | <img src="nexus/JoinClub-web.png" alt="Desktop View" style="max-width: 100%; height: auto; border-radius: 10px; border: 1px solid gray;"> |

## Permission Page
This page provides guidelines and permissions for users who want to lead a club.

|  | |
|-------------|--------------|
| <img src="nexus/NSCLead-mobile.png" alt="Mobile View" style="max-width: 100%; height: auto; border-radius: 10px; border: 1px solid gray;"> | <img src="nexus/NSCLead-web.png" alt="Desktop View" style="max-width: 100%; height: auto; border-radius: 10px; border: 1px solid gray;"> |

## Create Page
This section is where a club leader creates a club with their team.

|  | |
|-------------|--------------|
| <img src="nexus/CreateClub-mobile.png" alt="Mobile View" style="max-width: 100%; height: auto; border-radius: 10px; border: 1px solid gray;"> | <img src="nexus/CreateClub-web.png" alt="Desktop View" style="max-width: 100%; height: auto; border-radius: 10px; border: 1px solid gray;"> |

## Discussion Page
This page displays discussion contents, such as resources, questions, and tips.


|  | |
|-------------|--------------|
| <img src="nexus/MainPage-mobile.png" alt="Mobile View" style="max-width: 100%; height: auto; border-radius: 10px; border: 1px solid gray;"> | <img src="nexus/MainPage-web.png" alt="Desktop View" style="max-width: 100%; height: auto; border-radius: 10px; border: 1px solid gray;"> |

## Announcement Page
This page is responsible for important events, announcements, and important resources.


|  | |
|-------------|--------------|
| <img src="nexus/AnnouncementPage-mobile.png" alt="Mobile View" style="max-width: 100%; height: auto; border-radius: 10px; border: 1px solid gray;"> | <img src="nexus/AnnouncementPage-web.png" alt="Desktop View" style="max-width: 100%; height: auto; border-radius: 10px; border: 1px solid gray;"> |

## People Page
This page displays the members, and officers of the club.


|  | |
|-------------|--------------|
| <img src="nexus/PeoplePage-mobile.png" alt="Mobile View" style="max-width: 100%; height: auto; border-radius: 10px; border: 1px solid gray;"> | <img src="nexus/PeoplePage-web.png" alt="Desktop View" style="max-width: 100%; height: auto; border-radius: 10px; border: 1px solid gray;"> |


##END
>>>>>>> 3e77a94d6c084242715fdccd0f857271ecd4d94f
