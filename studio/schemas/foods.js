export default {
  name: "foods",
  type: "document",
  title: "Foods",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      title: "Images",
      name: "images",
      type: "array",
      options: {
        hotspot: true, // <-- Defaults to false
      },
      of: [
        {
          type: "image",
          fields: [
            {
              name: "date",
              type: "date",
              title: "Date",
              options: {
                dateFormat: "DD-MM-YYYY",
                calendarTodayLabel: "Today",
                isHighlighted: true, // <-- make this field easily accessible
              },
            },
          ],
        },
      ],
    },
  ],
};
