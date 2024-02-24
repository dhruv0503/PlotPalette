import React from 'react'
import classNames from 'classnames';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';


function Accordian() {
    return (
        <div className='bg-custom-50 p-10 '>
        <Accordion.Root
            className="bg-black max-w-xxl  rounded-md shadow-[0_2px_10px] shadow-black/5"
            type="single"
            defaultValue="item-1"
            collapsible
      >
          
            <AccordionItem value="item-1">
                    <AccordionTrigger>How do I submit a movie review?</AccordionTrigger>
                    <AccordionContent>To submit a movie review, simply navigate to the movie's page on our website and click on the "Write a Review" button. From there, you can share your thoughts, rate the movie, and submit your review for others to read.</AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                    <AccordionTrigger>Can I edit or delete my movie review after submitting it?</AccordionTrigger>
                <AccordionContent >
                        Yes, you can edit or delete your movie review. Simply go to your profile, locate the review you want to edit or delete, and select the appropriate option.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
                    <AccordionTrigger>How can I share a movie I like with my friends?</AccordionTrigger>
                <AccordionContent>
                        Sharing a movie you like is easy! Simply click on the share button located on the movie's page and choose your preferred platform to share it with your friends via social media, email, or messaging apps.
                </AccordionContent>
          </AccordionItem>
          
            </Accordion.Root>
    </div>
  )
}
const AccordionItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
        className={classNames(
            'focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]',
            className
        )}
        {...props}
        ref={forwardedRef}
    >
        {children}
    </Accordion.Item>
));

const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="flex">
        <Accordion.Trigger
            className={classNames(
                'text-stone-900 shadow-mauve6 hover:bg-mauve2 group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none',
                className
            )}
            {...props}
            ref={forwardedRef}
        >
            {children}
            <ChevronDownIcon
                className="text-stone-950 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
                aria-hidden
            />
        </Accordion.Trigger>
    </Accordion.Header>
));

const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
        className={classNames(
            'text-stone-950 bg-custom-30 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]',
            className
        )}
        {...props}
        ref={forwardedRef}
    >
        <div className="py-[15px] px-5">{children}</div>
    </Accordion.Content>
));

export default Accordian
