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
  buildRoute('tos', Pages.TermsOfServicePage),
  buildRoute('forgot-password', inProgressSitePage),
  buildRoute('sign-up--initial', Pages.SignUpInitialPage),
  buildRoute('sign-up--company', Pages.SignUpCompanyPage),
  buildRoute('sign-up--pricing', Pages.SignUpPricingPage),
  buildRoute('sign-up--payment-data', Pages.SignUpPaymentPage),
  buildRoute('sign-up--billing', Pages.SignUpBillingPage),
  buildRoute('sign-up--confirm-pending', Pages.SignUpConfirmPage),
  buildRoute('sign-in', Pages.SignInPage)
];

export const authenticatedRoutes = [
  buildRoute('platform-home', Pages.PlatformHomePage),
  buildRoute('platform', inProgressPlatformPage)
];

export const protectedRoutes = [
  buildPlatformRoute(
    'configuration/sample-type',
    inProgressPlatformPage,
    'SAMPLE_TYPE_REPORT'
  ),
  buildPlatformRoute(
    'configuration/sample-type-parameter',
    inProgressPlatformPage,
    'SAMPLE_TYPE_MANAGEMENT'
  ),
  buildPlatformRoute(
    'configuration/sample-function',
    inProgressPlatformPage,
    'SAMPLE_FUNCTION_MANAGEMENT'
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
    inProgressPlatformPage,
    'CLIENT_MANAGEMENT'
  ),
  buildPlatformRoute(
    'security/user',
    inProgressPlatformPage,
    'USERS_MANAGEMENT'
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
  buildPlatformRoute('security/log', inProgressPlatformPage, 'PLATFORM_ADMIN'),
  buildPlatformRoute(
    'security/backup',
    inProgressPlatformPage,
    'PLATFORM_BACKUP'
  ),
  buildPlatformRoute(
    'security/parameter',
    inProgressPlatformPage,
    'PLATFORM_ADMIN'
  ),
  buildPlatformRoute(
    'inventory/patient',
    inProgressPlatformPage,
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
