import React, { useState } from 'react';
import { MessageIcon, PhoneIcon, EmailIcon, UserIcon, CheckCircleIcon } from './icons';

const ContactPage: React.FC = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Form submitted:", formData);

        setIsSubmitted(true);

        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    return (
        <div className="animate-fadeIn min-h-screen flex items-center justify-center p-6">

            <div className="w-full max-w-6xl space-y-14">

                {/* Header */}
                <div className="text-center space-y-5">

                    <div className="inline-flex justify-center items-center w-24 h-24 rounded-3xl bg-emerald-50 dark:bg-emerald-900/30 shadow-xl">
                        <MessageIcon className="h-12 w-12 text-emerald-600" />
                    </div>

                    <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        تواصل معنا
                    </h1>

                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        نحن هنا لمساعدتك في أي استفسار. ارسل رسالتك وسنقوم بالرد عليك في أقرب وقت.
                    </p>

                </div>

                {/* Form Card */}
                <div className="relative">

                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-gray-900 rounded-3xl blur-3xl opacity-60"></div>

                    <div className="relative backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-2xl p-10 transition-all duration-500 hover:shadow-3xl">

                        {isSubmitted ? (

                            <div className="text-center space-y-7 py-16">

                                <CheckCircleIcon className="h-24 w-24 mx-auto text-emerald-500 animate-pulse" />

                                <div className="space-y-3">
                                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                                        شكرًا لك!
                                    </h3>

                                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                                        تم استلام رسالتك بنجاح وسنرد عليك قريبًا.
                                    </p>
                                </div>

                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xl hover:shadow-emerald-400/40 transition-all duration-300 hover:scale-105"
                                >
                                    إرسال رسالة أخرى
                                </button>

                            </div>

                        ) : (

                            <form onSubmit={handleSubmit} className="space-y-9">

                                <div className="grid md:grid-cols-2 gap-8">

                                    {[
                                        { label: "الاسم الكامل", name: "name", type: "text", icon: UserIcon },
                                        { label: "البريد الإلكتروني", name: "email", type: "email", icon: EmailIcon }
                                    ].map((field, index) => {

                                        const Icon = field.icon;

                                        return (
                                            <div key={index} className="space-y-3 group">

                                                <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                                                    {field.label}
                                                </label>

                                                <div className="relative">

                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-5 text-gray-400 group-focus-within:text-emerald-500 transition">
                                                        <Icon className="h-5 w-5" />
                                                    </div>

                                                    <input
                                                        type={field.type}
                                                        name={field.name}
                                                        required
                                                        value={(formData as any)[field.name]}
                                                        onChange={handleChange}
                                                        className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 pr-14 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all duration-300"
                                                    />

                                                </div>

                                            </div>
                                        );
                                    })}

                                </div>

                                <div className="space-y-3">

                                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                                        الموضوع
                                    </label>

                                    <input
                                        type="text"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all duration-300"
                                    />

                                </div>

                                <div className="space-y-3">

                                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                                        رسالتك
                                    </label>

                                    <textarea
                                        name="message"
                                        rows={6}
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all duration-300 resize-none"
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-5 rounded-2xl text-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xl hover:shadow-emerald-400/30 transition-all duration-300 hover:scale-[1.01]"
                                >
                                    إرسال الرسالة
                                </button>

                            </form>

                        )}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ContactPage;