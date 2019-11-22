import * as Pages from './components/pages';

const inProgressSitePage = Pages.DefaultPage;
const inProgressPlatformPage = Pages.DefaultPlatformPage;

const buildRoute = (path, component) => ({ path: `/${path}`, component });
const buildPlatformRoute = (path, component, permission) => ({
  path: `/${path}`,
  component,
  permission
});

export const unprotectedRoutes = [
  buildRoute('pricing', Pages.PricingPage),
  buildRoute('ssc', inProgressSitePage),
  buildRoute('about', Pages.AboutUsPage),
  buildRoute('contact-us', Pages.ContactUsPage),
  buildRoute('tos', Pages.TermsOfServicePage),
  buildRoute('privacy-policy', Pages.PrivacyPolicyPage),
  buildRoute('forgot-password', Pages.ForgotPasswordPage),
  buildRoute('sign-up--initial', Pages.SignUpInitialPage),
  buildRoute('sign-up--company', Pages.SignUpCompanyPage),
  buildRoute('sign-up--pricing', Pages.SignUpPricingPage),
  buildRoute('sign-up--payment-data', Pages.SignUpPaymentPage),
  buildRoute('sign-up--billing', Pages.SignUpBillingPage),
  buildRoute('sign-up--confirm-pending', Pages.SignUpConfirmPage),
  buildRoute('sign-up--verify/:username/:code', Pages.SignUpVerifyPage),
  buildRoute('sign-in', Pages.SignInPage),
  buildRoute('recover-password/:token/:username', Pages.RecoverPasswordPage),
  buildRoute('service-catalog/:code', Pages.ProductDetailPage),
  buildRoute('service-catalog', Pages.ProductSearchPage),
  buildRoute('faq', Pages.FaqsPage),
  buildRoute('survey-results/:id', Pages.SurveyResultsPage),
  buildRoute('blog', Pages.BlogPage),
  buildRoute('newsletter/subscribe', Pages.SubscribeToNewsletterPage),
  buildRoute(
    'newsletter/unsubscribe/:token',
    Pages.UnsubscribeToNewsletterPage
  ),
  buildRoute('client-management/bill/:id', Pages.PrintBillPage)
];

export const authenticatedRoutes = [
  buildRoute('platform-home', Pages.PlatformHomePage),
  buildRoute('platform/support-ticket/start', Pages.StartSupportTicketPage),
  buildRoute('platform/support-ticket/:id/reply', Pages.ReplySupportTicketPage),
  buildRoute('platform/support-ticket', Pages.ListMyTicketsPage),
  buildRoute('account/change-password', Pages.ChangePasswordPage),
  buildRoute('account/leave-comment', Pages.LeaveCommentPage),
  buildRoute('platform-search', Pages.SearchBackOfficePage),
  buildRoute('do-feedback-form', Pages.DoFeedbackFormPage),
  buildRoute('client-landing', Pages.ClientLandingPage),
  buildRoute('client/buy-more', Pages.BuyMorePage),
  buildRoute(
    'client-management/return-request/:receiptId',
    Pages.RequestReturnPage
  ),
  buildRoute('platform', inProgressPlatformPage)
];

export const protectedRoutes = [
  buildPlatformRoute(
    'management/profit-report',
    Pages.ViewProfitReportPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'management/chat-statistics',
    Pages.ViewChatStatisticsPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'management/product-question/reply/:id',
    Pages.ReplyProductQuestionPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'management/product-question',
    Pages.ListProductQuestionsPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'management/receipt-return-request/reject/:id',
    Pages.RejectReturnRequestPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'management/receipt-return-request',
    Pages.ListReceiptReturnRequestsPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'support/chat-conversation/:id/reply',
    Pages.ReplyChatConversationPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'support/chat-conversation',
    Pages.ListChatConversationsPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'support/support-ticket/:id/reply',
    Pages.ReplySupportTicketPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'support/support-ticket',
    Pages.ListSupportTicketsPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'marketing/newsletter/new',
    Pages.SendNewsletterPage,
    'NEWS_MANAGEMENT'
  ),
  buildPlatformRoute(
    'marketing/site-news-category/new',
    Pages.EditSiteNewsCategoryPage,
    'NEWS_MANAGEMENT'
  ),
  buildPlatformRoute(
    'marketing/site-news-category/:id',
    Pages.EditSiteNewsCategoryPage,
    'NEWS_MANAGEMENT'
  ),
  buildPlatformRoute(
    'marketing/site-news-category',
    Pages.ListSiteNewsCategoriesPage,
    'NEWS_MANAGEMENT'
  ),
  buildPlatformRoute(
    'marketing/site-news/new',
    Pages.EditSiteNewsArticlesPage,
    'NEWS_MANAGEMENT'
  ),
  buildPlatformRoute(
    'marketing/site-news/:id',
    Pages.EditSiteNewsArticlesPage,
    'NEWS_MANAGEMENT'
  ),
  buildPlatformRoute(
    'marketing/site-news',
    Pages.ListSiteNewsArticlesPage,
    'NEWS_MANAGEMENT'
  ),
  buildPlatformRoute(
    'marketing/survey-form/results/:id',
    Pages.ViewSurveyResultsPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'marketing/survey-form/compare/:id1/:id2',
    Pages.CompareSurveyResultsPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'marketing/survey-form/new',
    Pages.EditSurveyFormPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'marketing/survey-form',
    Pages.ListSurveyFormsPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'marketing/feedback-form/results/:id',
    Pages.ViewFeedbackFormResultsPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'marketing/feedback-form/compare/:id1/:id2',
    Pages.CompareFeedbackFormsPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'marketing/feedback-form/new',
    Pages.EditFeedbackFormPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'marketing/feedback-form',
    Pages.ListFeedbackFormPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'configuration/platform-menu/new',
    Pages.EditPlatformMenuPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'configuration/platform-menu/:id',
    Pages.EditPlatformMenuPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'configuration/platform-menu',
    Pages.ListPlatformMenuPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'configuration/sample-type/new',
    Pages.EditSampleTypePage,
    'SAMPLE_TYPE_MANAGEMENT'
  ),
  buildPlatformRoute(
    'configuration/sample-type/:id',
    Pages.EditSampleTypePage,
    'SAMPLE_TYPE_MANAGEMENT'
  ),
  buildPlatformRoute(
    'configuration/sample-type',
    Pages.ListSampleTypePage,
    'SAMPLE_TYPE_REPORT'
  ),
  buildPlatformRoute(
    'configuration/unit-of-measure/new',
    Pages.EditUnitOfMeasurePage,
    'UNIT_OF_MEASURE_MANAGEMENT'
  ),
  buildPlatformRoute(
    'configuration/unit-of-measure',
    Pages.ListUnitOfMeasuresPage,
    'UNIT_OF_MEASURE_MANAGEMENT'
  ),
  buildPlatformRoute(
    'configuration/sample-type-parameter/new',
    Pages.EditSampleTypeParameterPage,
    'SAMPLE_TYPE_PARAMETERS_MANAGEMENT'
  ),
  buildPlatformRoute(
    'configuration/sample-type-parameter/:id',
    Pages.EditSampleTypeParameterPage,
    'SAMPLE_TYPE_PARAMETERS_MANAGEMENT'
  ),
  buildPlatformRoute(
    'configuration/sample-type-parameter',
    Pages.ListSampleParameterTypesPage,
    'SAMPLE_TYPE_PARAMETERS_MANAGEMENT'
  ),
  buildPlatformRoute(
    'configuration/sample-function/new',
    Pages.EditSampleFunctionPage,
    'SAMPLE_FUNCTION_MANAGEMENT'
  ),
  buildPlatformRoute(
    'configuration/sample-function/:id',
    Pages.EditSampleFunctionPage,
    'SAMPLE_FUNCTION_MANAGEMENT'
  ),
  buildPlatformRoute(
    'configuration/sample-function',
    Pages.ListSampleFunctionsPage,
    'SAMPLE_FUNCTION_REPORT'
  ),
  buildPlatformRoute(
    'configuration/language/:id',
    Pages.EditLanguageEntryPage,
    'LANGUAGES_MANAGEMENT'
  ),
  buildPlatformRoute(
    'configuration/language',
    Pages.ListLanguagesPage,
    'LANGUAGES_MANAGEMENT'
  ),
  buildPlatformRoute(
    'configuration/client-billing',
    Pages.ListClientsPage,
    'CLIENT_MANAGEMENT'
  ),
  buildPlatformRoute(
    'security/user/new',
    Pages.EditUserPage,
    'USERS_MANAGEMENT'
  ),
  buildPlatformRoute(
    'security/user/:id',
    Pages.EditUserPage,
    'USERS_MANAGEMENT'
  ),
  buildPlatformRoute(
    'security/user',
    Pages.ListPlatformUsersPage,
    'USERS_REPORT'
  ),
  buildPlatformRoute(
    'security/role/new',
    Pages.EditRolePage,
    'ROLES_MANAGEMENT'
  ),
  buildPlatformRoute(
    'security/role/:id',
    Pages.EditRolePage,
    'ROLES_MANAGEMENT'
  ),
  buildPlatformRoute('security/role', Pages.ListRolesPage, 'ROLES_REPORT'),
  buildPlatformRoute('security/log/:id', Pages.ReadLogPage, 'PLATFORM_ADMIN'),
  buildPlatformRoute('security/log', Pages.ListLogsPage, 'PLATFORM_ADMIN'),
  buildPlatformRoute(
    'security/restore/from',
    Pages.DoRestoreFromPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'security/backup/browse-new',
    Pages.NewBackupFSPage,
    'PLATFORM_BACKUP'
  ),
  buildPlatformRoute(
    'security/backup/new',
    Pages.NewBackupPage,
    'PLATFORM_BACKUP'
  ),
  buildPlatformRoute(
    'security/backup',
    Pages.ListBackupsPage,
    'PLATFORM_BACKUP'
  ),
  buildPlatformRoute(
    'security/parameter',
    inProgressPlatformPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'inventory/patient/new',
    Pages.EditPatientPage,
    'PATIENTS_MANAGEMENT'
  ),
  buildPlatformRoute(
    'inventory/patient/:id',
    Pages.EditPatientPage,
    'PATIENTS_MANAGEMENT'
  ),
  buildPlatformRoute(
    'inventory/patient',
    Pages.ListPatientsPage,
    'PATIENTS_MANAGEMENT'
  ),
  buildPlatformRoute(
    'inventory/sample',
    inProgressPlatformPage,
    'SAMPLE_MANAGEMENT'
  ),
  buildPlatformRoute(
    'management/member',
    inProgressPlatformPage,
    'MEMBER_MANAGEMENT'
  ),
  buildPlatformRoute(
    'management/payment-type',
    inProgressPlatformPage,
    'PAYMENT_METHOD_MANAGEMENT'
  ),
  buildPlatformRoute(
    'management/billing',
    inProgressPlatformPage,
    'PAYMENT_METHOD_MANAGEMENT'
  ),
  buildPlatformRoute(
    'work-order/work-order',
    inProgressPlatformPage,
    'WORK_ORDER_REPORT'
  )
];
