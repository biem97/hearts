import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "t42s1e4v",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: false,
  withCredentials: true,
  token:
    "ske5DrsYgK04cG246W5ZuvD8JL0y5m4e7LmFbkaaL5ihNUMODiPgsXH0I2UsWtJxOxHeSRzY7eTdcOgvvNUgmx7pl0NEdrQCCh93wF56URdf3Hk2fketTo42BtilIo6JpwNsHYJ5mB0A8mQurh0ymwd5AJTq3frUaP6PDNioyxNlM4rfCPHe",
});
