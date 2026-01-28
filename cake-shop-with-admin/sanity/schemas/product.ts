import { defineType, defineField } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Cake Type',
      type: 'string',
      options: {
        list: [
          { title: 'Chocolate', value: 'Chocolate' },
          { title: 'Classic', value: 'Classic' },
          { title: 'Theme', value: 'Theme' },
          { title: 'Fruit', value: 'Fruit' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isBestSeller',
      title: 'Best Seller',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
      media: 'image',
    },
  },
});
