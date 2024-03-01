## Richmenu Mockup

A richmenu mockup using HTML and CSS to build a beautiful looking LINE Rich Menu. Then it can be exported into a .png file to further used in [LINE Bot Designer](https://developers.line.biz/en/docs/messaging-api/using-bot-designer/) to build a JSON body for the Rich Menu. After we get the Rich Menu image and JSON body then we can upload them via Line Messaging API. We also can delete the unwanted Rich Menu by a just a click.

## Getting Started

First, copy your LINE Channel Access Token to .env file.

Then we can run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

And modify the RichMenu component as needed.

Then we export the image by clicking the button, Download image, in the home page. We will get the .png image file.

After we downloaded the image, we can create the json body via [LINE Bot Designer](https://developers.line.biz/en/docs/messaging-api/using-bot-designer/). Then we copy the new json body to the json folder in `src/json/create-rich-menu/`, import the json file by editing the code in `src/lib/rich-menu-api.ts` in the function `getRichMenuJsonFromLocal`.

Then we can finally upload the image and json body in the upload page.
