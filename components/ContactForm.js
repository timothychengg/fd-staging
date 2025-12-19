'use client';

import { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Real estate agent',
    address: '',
    sqft: '',
    timeline: 'As soon as possible',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    if (!phone) return true; // Optional field
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10 || cleaned.length === 11;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // TODO: Replace with your actual form submission endpoint
      // For now, this will just show a success message
      // You can integrate with services like Formspree, SendGrid, or your own API

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Example: Uncomment when you have an API endpoint
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // if (!response.ok) throw new Error('Submission failed');

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'Real estate agent',
        address: '',
        sqft: '',
        timeline: 'As soon as possible',
        message: '',
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className='space-y-4 rounded-2xl border border-luxmuted/15 bg-white p-5'
      onSubmit={handleSubmit}
      aria-label='Contact form'
      noValidate
    >
      <div className='space-y-1'>
        <label className='text-[0.8rem] font-medium' htmlFor='name'>
          Name <span className='text-luxmuted/60'>*</span>
        </label>
        <input
          id='name'
          name='name'
          type='text'
          required
          value={formData.name}
          onChange={handleChange}
          className={`w-full rounded-full border ${
            errors.name
              ? 'border-red-300 bg-red-50'
              : 'border-luxmuted/25 bg-[#f5efe7]'
          } px-3 py-2 text-sm outline-none transition-colors focus:border-luxaccent focus:bg-white focus:ring-2 focus:ring-luxaccent/20`}
          placeholder='Your name'
          aria-required='true'
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id='name-error' className='text-xs text-red-600 mt-0.5'>
            {errors.name}
          </p>
        )}
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <div className='space-y-1'>
          <label className='text-[0.8rem] font-medium' htmlFor='email'>
            Email <span className='text-luxmuted/60'>*</span>
          </label>
          <input
            id='email'
            name='email'
            type='email'
            required
            value={formData.email}
            onChange={handleChange}
            className={`w-full rounded-full border ${
              errors.email
                ? 'border-red-300 bg-red-50'
                : 'border-luxmuted/25 bg-[#f5efe7]'
            } px-3 py-2 text-sm outline-none transition-colors focus:border-luxaccent focus:bg-white focus:ring-2 focus:ring-luxaccent/20`}
            placeholder='you@example.com'
            aria-required='true'
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id='email-error' className='text-xs text-red-600 mt-0.5'>
              {errors.email}
            </p>
          )}
        </div>

        <div className='space-y-1'>
          <label className='text-[0.8rem] font-medium' htmlFor='phone'>
            Phone <span className='text-luxmuted/60'>(optional)</span>
          </label>
          <input
            id='phone'
            name='phone'
            type='tel'
            value={formData.phone}
            onChange={handleChange}
            className={`w-full rounded-full border ${
              errors.phone
                ? 'border-red-300 bg-red-50'
                : 'border-luxmuted/25 bg-[#f5efe7]'
            } px-3 py-2 text-sm outline-none transition-colors focus:border-luxaccent focus:bg-white focus:ring-2 focus:ring-luxaccent/20`}
            placeholder='(408) 393-2161'
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p id='phone-error' className='text-xs text-red-600 mt-0.5'>
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className='space-y-1'>
        <label className='text-[0.8rem]' htmlFor='role'>
          I am a…
        </label>
        <select
          id='role'
          name='role'
          value={formData.role}
          onChange={handleChange}
          className='w-full rounded-full border border-luxmuted/25 bg-[#f5efe7] px-3 py-2 text-sm outline-none transition-colors focus:border-luxaccent focus:bg-white focus:ring-2 focus:ring-luxaccent/20'
        >
          <option>Real estate agent</option>
          <option>Homeowner / seller</option>
          <option>Other</option>
        </select>
      </div>

      <div className='space-y-1'>
        <label className='text-[0.8rem]' htmlFor='address'>
          Property address
        </label>
        <input
          id='address'
          name='address'
          value={formData.address}
          onChange={handleChange}
          className='w-full rounded-full border border-luxmuted/25 bg-[#f5efe7] px-3 py-2 text-sm outline-none transition-colors focus:border-luxaccent focus:bg-white focus:ring-2 focus:ring-luxaccent/20'
          placeholder='Street, City, ZIP'
        />
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <div className='space-y-1'>
          <label className='text-[0.8rem]' htmlFor='sqft'>
            Approximate square footage
          </label>
          <input
            id='sqft'
            name='sqft'
            type='number'
            value={formData.sqft}
            onChange={handleChange}
            className='w-full rounded-full border border-luxmuted/25 bg-[#f5efe7] px-3 py-2 text-sm outline-none transition-colors focus:border-luxaccent focus:bg-white focus:ring-2 focus:ring-luxaccent/20'
            placeholder='e.g., 2,400'
            min='0'
          />
        </div>

        <div className='space-y-1'>
          <label className='text-[0.8rem]' htmlFor='timeline'>
            Ideal install timing
          </label>
          <select
            id='timeline'
            name='timeline'
            value={formData.timeline}
            onChange={handleChange}
            className='w-full rounded-full border border-luxmuted/25 bg-[#f5efe7] px-3 py-2 text-sm outline-none transition-colors focus:border-luxaccent focus:bg-white focus:ring-2 focus:ring-luxaccent/20'
          >
            <option>As soon as possible</option>
            <option>Within 1–2 weeks</option>
            <option>Within a month</option>
            <option>Just exploring options</option>
          </select>
        </div>
      </div>

      <div className='space-y-1'>
        <label className='text-[0.8rem]' htmlFor='message'>
          Anything else we should know?
        </label>
        <textarea
          id='message'
          name='message'
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className='w-full rounded-2xl border border-luxmuted/25 bg-[#f5efe7] px-3 py-2 text-sm outline-none transition-colors focus:border-luxaccent focus:bg-white focus:ring-2 focus:ring-luxaccent/20'
          placeholder='Share listing link, photos, unique features, or specific goals for the sale.'
        />
      </div>

      {submitStatus === 'success' && (
        <div
          className='rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800'
          role='alert'
        >
          Thank you! We&apos;ve received your inquiry and will respond within
          one business day.
        </div>
      )}

      {submitStatus === 'error' && (
        <div
          className='rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800'
          role='alert'
        >
          Something went wrong. Please try again or contact us directly at
          info@fanddstaging.com.
        </div>
      )}

      <button
        type='submit'
        disabled={isSubmitting}
        className='btn-pill bg-luxtxt text-luxbg hover:bg-luxtxt/90 focus-visible:outline-luxtxt disabled:opacity-50 disabled:cursor-not-allowed transition-opacity'
        aria-label='Submit contact form'
      >
        {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
      </button>

      <p className='text-[0.8rem] text-luxmuted'>
        We will respond within one business day.
      </p>
    </form>
  );
}
