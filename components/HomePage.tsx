import React from 'react';
import { SummaryIcon, MedicationIcon, VitalsIcon, ChevronLeftIcon, ThanyaLogoWide } from './icons';

interface HomePageProps {
    onNavigateToDashboard: () => void;
}

const FeatureCard: React.FC<{ icon: React.ElementType, title: string, description: string }> = ({ icon: Icon, title, description }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 mb-4">
            <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const HomePage: React.FC<HomePageProps> = ({ onNavigateToDashboard }) => {
    return (
        <div className="space-y-20">
            {/* Hero Section */}
            <section className="text-center bg-white p-10 rounded-2xl shadow-xl overflow-hidden" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/az-subtle.png)'}}>
                <div className="animate-fadeIn" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
                    <ThanyaLogoWide className="h-24 w-auto mx-auto mb-4" />
                </div>
                <div className="animate-fadeIn" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-800 leading-tight">
                        لأن كل ثانية تهم
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                        تطبيق ثانية يمنحك وصولاً فورياً لسجلاتك الطبية ويشاركها مع من يهمك عند الطوارئ، لتضمن أفضل رعاية في أسرع وقت.
                    </p>
                </div>
                <div className="mt-8 flex justify-center gap-4 animate-fadeIn" style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}>
                    <button 
                        onClick={onNavigateToDashboard}
                        className="flex items-center px-8 py-3 text-lg font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-md transition-all duration-300 transform hover:scale-105"
                    >
                        <span>ابدأ الآن</span>
                        <ChevronLeftIcon className="h-5 w-5 mr-2" />
                    </button>
                    <button className="px-8 py-3 text-lg font-semibold text-emerald-700 bg-gray-100 rounded-lg hover:bg-gray-200 shadow-md transition-all duration-300">
                        اعرف المزيد
                    </button>
                </div>
            </section>
            
            {/* Features Section */}
            <section className="animate-fadeIn" style={{ animationDelay: '0.8s', animationFillMode: 'backwards' }}>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">لماذا تختار ثانية؟</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard 
                        icon={SummaryIcon}
                        title="سجل طبي موحد"
                        description="جميع معلوماتك الصحية، من التاريخ المرضي إلى نتائج المختبر، في مكان واحد آمن وسهل الوصول."
                    />
                    <FeatureCard 
                        icon={VitalsIcon}
                        title="اتصال بالأجهزة الذكية"
                        description="اربط أجهزتك الصحية لمراقبة العلامات الحيوية بشكل مستمر ومشاركتها مع طبيبك."
                    />
                    <FeatureCard 
                        icon={MedicationIcon}
                        title="إدارة الأدوية"
                        description="تنبيهات بمواعيد الأدوية، سجل للجرعات، ومعلومات شاملة عن أدويتك لالتزام أفضل."
                    />
                </div>
            </section>
            
            {/* About Section */}
            <section id="about-us" className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fadeIn" style={{ animationDelay: '1s', animationFillMode: 'backwards' }}>
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 p-8 lg:p-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">عن ثانية</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            نحن فريق من المبتكرين في مجال التكنولوجيا الصحية، يجمعنا شغف مشترك لإحداث فرق حقيقي في حياة الناس. تأسست "ثانية" على مبدأ أن التكنولوجيا يجب أن تخدم الإنسان، خاصة في أوقات الحاجة.
                        </p>
                         <p className="text-gray-600 leading-relaxed">
                            نحن ملتزمون بتطوير حلول تجعل الرعاية الصحية أكثر شفافية، كفاءة، وأمانًا للجميع، وإنشاء جسر بين المريض والطبيب لتحسين جودة الرعاية.
                        </p>
                    </div>
                    <div className="md:w-1/2 h-64 md:h-auto">
                        <img 
                            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop" 
                            alt="طبيب يستخدم جهاز لوحي"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;