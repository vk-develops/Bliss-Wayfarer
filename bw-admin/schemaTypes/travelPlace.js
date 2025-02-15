import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'travelPlace',
  title: 'Travel Place',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'about',
      title: 'About',
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
    defineField({
      name: 'attraction',
      title: 'attraction',
      type: 'reference',
      to: [{type: 'attraction'}],
    }),
    defineField({
      name: 'hotels',
      title: 'Hotels',
      type: 'reference',
      to: [{type: 'travelPlace'}],
    }),
    defineField({
      name: 'restaurants',
      title: 'Restaurants',
      type: 'reference',
      to: [{type: 'travelPlace'}],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'images.0',
    },
    prepare(selection) {
      return {...selection}
    },
  },
})
