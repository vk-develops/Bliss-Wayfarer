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
      name: 'attractions',
      title: 'Attractions',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'attraction'}]}], // Changed to an array
    }),
    defineField({
      name: 'hotels',
      title: 'Hotels',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'hotel'}]}], // Changed to an array
    }),
    defineField({
      name: 'restaurants',
      title: 'Restaurants',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'restaurant'}]}], // Changed to an array
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
