//https://auth.reportbase.com/api/v1/refresh_token
var accesstoken="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2ODM5NDE1NjEsImV4cCI6MTY4Mzk0MzM2MSwidXNlcl9pZCI6Ijg0Zjg5ODg1LTE4MGUtNDc5ZS04OTZkLWFmZTAwMzgzODJjZCIsImlzcyI6Imh0dHBzOi8vYXV0aC5yZXBvcnRiYXNlLmNvbSIsImVtYWlsIjoicmVwb3J0YmFzZUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiVG9tIiwibGFzdF9uYW1lIjoiQnJpbmttYW4iLCJ1c2VybmFtZSI6InJlcG9ydGJhc2UiLCJvcmdfaWRfdG9fb3JnX21lbWJlcl9pbmZvIjp7IjA1NDU4ZWI1LTJmNWYtNGU4NS05YjkwLWJjOGVhM2MyYmMzNCI6eyJvcmdfaWQiOiIwNTQ1OGViNS0yZjVmLTRlODUtOWI5MC1iYzhlYTNjMmJjMzQiLCJvcmdfbmFtZSI6InJlcG9ydGJhc2UiLCJ1cmxfc2FmZV9vcmdfbmFtZSI6InJlcG9ydGJhc2UiLCJvcmdfbWV0YWRhdGEiOnt9LCJ1c2VyX3JvbGUiOiJPd25lciIsImluaGVyaXRlZF91c2VyX3JvbGVzX3BsdXNfY3VycmVudF9yb2xlIjpbIk93bmVyIiwiQWRtaW4iLCJNZW1iZXIiXSwidXNlcl9wZXJtaXNzaW9ucyI6WyJwcm9wZWxhdXRoOjpjYW5faW52aXRlIiwicHJvcGVsYXV0aDo6Y2FuX2NoYW5nZV9yb2xlcyIsInByb3BlbGF1dGg6OmNhbl9yZW1vdmVfdXNlcnMiXX19fQ.aLfuWJN9Dh3ZCu0H90xoIS1DCaYS_toLYoxsROfcXSqnF-uBiCug7HhX7mOzOvu41cMebfB4jU29lLqah3GC0Qwg30IBOgm3qlLgdxLLUoZ1oEE2DOF3cRUv9d82XjAOOG0YR8gmIldR9wMn-nCXazNBHwqhpBcZOxofk_VkgG8W2T9AYhxevUw433SKYSVkuIeopKvYXnFH6_HWQOc88q9poJ6NMLAKoLTaraQfxlNQDiBL_wo1HWqUWuZbVkCZuwTwH-eP3V_K7EbcYmnVBvXU30_MXEUqZcrQHhttcgVSfzgkzrnqSM0-wL1KveYCVRt3FheiIis9xe7RziJWYQ";
var body = JSON.stringify( { accessToken: accesstoken });

fetch(`https://propelauth.reportbase5836.workers.dev`,
    {
        method: "POST",
        headers:
        {
            'Content-Type': 'application/json;charset=utf-8'
        },

        body: body
    })
  .then(response => response.text())
  .then(response => console.log(response))
  .catch(err => console.error(err));




