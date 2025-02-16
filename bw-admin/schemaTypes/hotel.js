import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hotel',
  title: 'Hotel',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mapLocation',
      title: 'Map Location',
      type: 'object',
      fields: [
        defineField({
          name: 'lat',
          title: 'Latitude',
          type: 'number',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'long',
          title: 'Longitude',
          type: 'number',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'starRating',
      title: 'Star Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'images.0',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title,
        media: media,
      }
    },
  },
})
