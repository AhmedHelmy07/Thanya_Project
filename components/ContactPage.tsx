import React, { useState } from 'react';
import { MessageIcon, PhoneIcon, EmailIcon, UserIcon, CheckCircleIcon } from './icons';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would connect to Firebase to store the message
        console.log("Form submitted:", formData);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="animate-fadeIn">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center">
                    <MessageIcon className="h-10 w-10 ml-3 text-emerald-600" />
                    تواصل معنا
                </h1>
                <p className="mt-2 text-lg text-gray-600">نحن هنا للمساعدة. أرسل لنا استفسارك وسنرد عليك قريبًا.</p>
            </div>

            <div className="mt-12 max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
                {isSubmitted ? (
                    <div className="text-center py-10">
                        <CheckCircleIcon className="h-16 w-16 mx-auto text-emerald-500" />
                        <h3 className="mt-4 text-2xl font-semibold text-gray-800">شكرًا لك!</h3>
                        <p className="mt-2 text-gray-600">تم استلام رسالتك بنجاح. سنتواصل معك في أقرب وقت ممكن.</p>
                        <button 
                            onClick={() => setIsSubmitted(false)}
                            className="mt-6 px-6 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-all"
                        >
                            إرسال رسالة أخرى
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                                <div className="relative">
                                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <UserIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm pr-10 focus:border-emerald-500 focus:ring-emerald-500" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <EmailIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm pr-10 focus:border-emerald-500 focus:ring-emerald-500" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">الموضوع</label>
                            <input type="text" name="subject" id="subject" required value={formData.subject} onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">رسالتك</label>
                            <textarea name="message" id="message" rows={5} required value={formData.message} onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"></textarea>
                        </div>
                        <div>
                            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300">
                                إرسال الرسالة
                            </button>
                        </div>
                    </form>
                )}
            </div>
             <div className="mt-10 text-center text-gray-600">
                <p>يمكنك أيضًا التواصل معنا عبر:</p>
                <div className="flex justify-center items-center space-x-6 mt-3">
                    <a href="mailto:support@thanya.com" className="flex items-center hover:text-emerald-600">
                        <EmailIcon className="h-5 w-5 ml-2" />
                        support@thanya.com
                    </a>
                    <a href="tel:+123456789" className="flex items-center hover:text-emerald-600">
                        <PhoneIcon className="h-5 w-5 ml-2" />
                        +1 (234) 567-89
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;