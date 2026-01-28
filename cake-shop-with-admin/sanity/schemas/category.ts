import { defineType, defineField } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Cake Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
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
      name: 'icon',
      title: 'Icon Name (from Lucide React)',
      type: 'string',
      description: 'e.g., Cake, Heart, Gift, PartyPopper, Baby, GraduationCap',
    }),
    defineField({
      name: 'bgColor',
      title: 'Background Color',
      type: 'string',
      description: 'Tailwind color class (e.g., bg-pink-50)',
    }),
    defineField({
      name: 'iconColor',
      title: 'Icon Color',
      type: 'string',
      description: 'Tailwind color class (e.g., text-pink-600)',
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
      title: 'title',
      subtitle: 'description',
    },
  },
});
