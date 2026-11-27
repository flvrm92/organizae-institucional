/**
 * Single source of truth for URLs, contact details and SEO copy.
 * Environment-specific values come from PUBLIC_* variables at build time.
 */

const trimSlash = (url: string) => url.replace(/\/+$/, '');

export const SITE_URL = trimSlash(import.meta.env.PUBLIC_SITE_URL ?? 'https://organizae.app.br');
export const PANEL_URL = trimSlash(import.meta.env.PUBLIC_PANEL_URL ?? 'https://painel.organizae.app.br');
export const LOGIN_URL = `${PANEL_URL}/login`;

export const WHATSAPP_NUMBER = '5516991666519';
export const WHATSAPP_DISPLAY = '(16) 99166-6519';
export const WHATSAPP_MESSAGE =
  'Olá, gostaria de saber mais informações sobre o sistema de gestão de lojas Organizae.';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const SEO = {
  name: 'Organizae',
  title: 'Organizae — Sistema de gestão de lojas: vendas, estoque e caixa',
  description:
    'Sistema de gestão para lojas: PDV para vendas, controle de estoque com importação de NF-e, ' +
    'controle de caixa por operador e relatórios. 100% online, funciona no computador e no celular.',
  locale: 'pt_BR',
  themeLight: '#f5f6fb',
  themeDark: '#0d0e1c',
} as const;

export const NAV = [
  { href: '#inicio', label: 'Início' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#para-quem-e', label: 'Para quem é' },
  { href: '#fale-conosco', label: 'Fale conosco' },
  { href: '#faq', label: 'FAQ' },
] as const;

export const FAQ: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: 'Preciso instalar alguma coisa?',
    a: 'Não. O Organizae é um sistema online: você acessa pelo navegador, com login e senha, de qualquer computador, tablet ou celular com internet.',
  },
  {
    q: 'Funciona no celular?',
    a: 'Sim. As telas se adaptam ao tamanho da tela, então dá para registrar uma venda, consultar o estoque ou ver o caixa do dia pelo celular.',
  },
  {
    q: 'O sistema emite nota fiscal?',
    a: 'Hoje o Organizae importa o XML da NF-e de compra para dar entrada no estoque: identifica o fornecedor, relaciona os itens aos seus produtos e atualiza custos. A emissão de nota fiscal de venda não faz parte do sistema no momento.',
  },
  {
    q: 'Como funciona o controle de caixa?',
    a: 'Cada operador abre o próprio caixa com um valor inicial. As vendas recebidas entram nele automaticamente, e você pode lançar entradas e saídas avulsas. No fechamento, o operador informa o valor contado por forma de pagamento e o sistema mostra a diferença em relação ao esperado.',
  },
  {
    q: 'Posso ter mais de um usuário na loja?',
    a: 'Sim. Você cadastra os usuários da equipe com perfis diferentes: administradores veem e gerenciam tudo, operadores ficam com o dia a dia de vendas e caixa.',
  },
  {
    q: 'Os dados da minha loja ficam separados de outras lojas?',
    a: 'Sim. Cada loja tem seus dados isolados: clientes, produtos, vendas e relatórios só aparecem para os usuários da própria loja.',
  },
  {
    q: 'Consigo saber se a loja está dando lucro?',
    a: 'Sim. Além do relatório de vendas e do fechamento de caixa, você registra as despesas da loja por tipo e acompanha o relatório de vendas × despesas do período.',
  },
  {
    q: 'Como faço para contratar?',
    a: 'Fale com a gente pelo WhatsApp. Entendemos como sua loja funciona, tiramos suas dúvidas e deixamos seu acesso pronto para começar.',
  },
];
