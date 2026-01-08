'use client';

import { useState, useCallback, useMemo } from 'react';

// Field length limits (matching backend)
const FIELD_LIMITS = {
  name: 100,
  email: 255,
  phone: 20,
  address: 200,
  sqft: 10,
  message: 2000,
};

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  phone: '',
  role: 'Real estate agent',
  address: '',
  sqft: '',
  timeline: 'As soon as possible',
  message: '',
};

export function ContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Memoize validation functions for better performance
  const validateEmail = useCallback((email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, []);

  const validatePhone = useCallback((phone) => {
    if (!phone) return true; // Optional field
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10 || cleaned.length === 11;
  }, []);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      const maxLength = FIELD_LIMITS[name];
      const trimmedValue = maxLength && value.length > maxLength 
        ? value.substring(0, maxLength) 
        : value;

      setFormData((prev) => ({ ...prev, [name]: trimmedValue }));
      
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const newErrors = {};

      // Validate required fields
      const trimmedName = formData.name.trim();
      if (!trimmedName) {
        newErrors.name = 'Name is required';
      } else if (trimmedName.length > FIELD_LIMITS.name) {
        newErrors.name = `Name must be less than ${FIELD_LIMITS.name} characters`;
      }

      const trimmedEmail = formData.email.trim();
      if (!trimmedEmail) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(trimmedEmail)) {
        newErrors.email = 'Please enter a valid email address';
      } else if (trimmedEmail.length > FIELD_LIMITS.email) {
        newErrors.email = `Email must be less than ${FIELD_LIMITS.email} characters`;
      }

      if (formData.phone) {
        if (!validatePhone(formData.phone)) {
          newErrors.phone = 'Please enter a valid phone number';
        } else if (formData.phone.length > FIELD_LIMITS.phone) {
          newErrors.phone = `Phone must be less than ${FIELD_LIMITS.phone} characters`;
        }
      }

      if (formData.message && formData.message.length > FIELD_LIMITS.message) {
        newErrors.message = `Message must be less than ${FIELD_LIMITS.message} characters`;
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        // Scroll to first error
        const firstErrorField = Object.keys(newErrors)[0];
        const errorElement = document.getElementById(firstErrorField);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          errorElement.focus();
        }
        return;
      }

      setIsSubmitting(true);
      setSubmitStatus(null);
      setErrors({}); // Clear any previous errors

      try {
        // Create AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        let response;
        try {
          response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
            signal: controller.signal,
          });
        } catch (fetchError) {
          clearTimeout(timeoutId);
          if (fetchError.name === 'AbortError') {
            throw new Error('Request timed out. Please check your connection and try again.');
          }
          throw new Error('Network error. Please check your connection and try again.');
        }
        clearTimeout(timeoutId);

        let result;
        try {
          result = await response.json();
        } catch (jsonError) {
          throw new Error('Invalid response from server. Please try again.');
        }

        if (!response.ok) {
          // Handle rate limiting
          if (response.status === 429) {
            throw new Error(
              result.error || `Too many requests. Please try again in ${result.retryAfter || 'a few'} minutes.`
            );
          }
          // Handle client errors (4xx)
          if (response.status >= 400 && response.status < 500) {
            throw new Error(result.error || 'Please check your form and try again.');
          }
          // Handle server errors (5xx)
          throw new Error(result.error || 'Server error. Please try again later.');
        }

        setSubmitStatus('success');
        setFormData({ ...INITIAL_FORM_DATA });
        
        // Reset form scroll position
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        setSubmitStatus('error');
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';
        console.error('Form submission error:', error);
        
        // Set a general error message for user
        setErrors({ 
          _general: errorMessage 
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateEmail, validatePhone]
  );

  // Character count for message field
  const messageCharCount = useMemo(
    () => formData.message.length,
    [formData.message]
  );

  return (
    <form
      className='space-y-4 rounded-2xl border border-luxmuted/15 bg-white p-5'
      onSubmit={handleSubmit}
      aria-label='Contact form'
      noValidate
    >
      {/* Honeypot field for spam protection (hidden from users) */}
      <input
        type='text'
        name='website'
        tabIndex={-1}
        autoComplete='off'
        style={{
          position: 'absolute',
          left: '-9999px',
          opacity: 0,
          pointerEvents: 'none',
        }}
        aria-hidden='true'
      />
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
        <div className='flex items-center justify-between'>
          <label className='text-[0.8rem]' htmlFor='message'>
            Anything else we should know?
          </label>
          {formData.message && (
            <span
              className={`text-xs ${
                messageCharCount > FIELD_LIMITS.message
                  ? 'text-red-600'
                  : messageCharCount > FIELD_LIMITS.message * 0.9
                  ? 'text-amber-600'
                  : 'text-luxmuted'
              }`}
            >
              {messageCharCount} / {FIELD_LIMITS.message}
            </span>
          )}
        </div>
        <textarea
          id='message'
          name='message'
          rows={4}
          value={formData.message}
          onChange={handleChange}
          maxLength={FIELD_LIMITS.message}
          className='w-full rounded-2xl border border-luxmuted/25 bg-[#f5efe7] px-3 py-2 text-sm outline-none transition-colors focus:border-luxaccent focus:bg-white focus:ring-2 focus:ring-luxaccent/20'
          placeholder='Share listing link, photos, unique features, or specific goals for the sale.'
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id='message-error' className='text-xs text-red-600 mt-0.5'>
            {errors.message}
          </p>
        )}
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
          aria-live='polite'
        >
          <p className='font-medium mb-1'>Submission failed</p>
          <p>
            {errors._general || 'Something went wrong. Please try again or contact us directly at '}
            {!errors._general && (
              <>
                <a
                  href='mailto:dhwang1129@gmail.com'
                  className='underline hover:no-underline'
                >
                  dhwang1129@gmail.com
                </a>
                .
              </>
            )}
          </p>
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
