/* 
========================================
CONFIGURAÇÕES DO SITE 
========================================

*/

const siteConfig = {
    // Informações Básicas
    businessName: "Café Aroma Local",
    tagline: "Café artesanal e sabores únicos",
    heroImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200",
    
    // Contato
    contact: {
        phone: "(21) 98765-4321",
        email: "contato@cafearoma.com.br",
        address: "Rua das Flores, 123 - Centro, Niterói/RJ",
        hours: "Seg-Sex: 7h-19h | Sáb-Dom: 8h-20h"
    },
    
    // Redes Sociais
    social: {
        instagram: "https://instagram.com/cafearoma",
        facebook: "https://facebook.com/cafearoma"
    },
    
    // Produtos/Serviços
    products: [
        {
            name: "Café Especial",
            description: "Grãos selecionados de origem única",
            price: "R$ 12,00",
            image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400"
        },
        {
            name: "Cappuccino",
            description: "Cremoso e aromático",
            price: "R$ 10,00",
            image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400"
        },
        {
            name: "Pães Artesanais",
            description: "Quentinho e tradicional",
            price: "R$ 8,00",
            image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=400"
        }
    ],
    

    // Configuração do Airtable
    airtable: {
        token: 'pat73R8NiqJSLxNk3.f6e0771c624288801665ea6b670808a174e498cb8b7513ac6b70c13ab0932cba',
        baseId: 'appzyQIfeq1YqMTvU',
        tableName: 'Contatos'
    },
    
    // Configurações de Envio de Formulário
    formConfig: {
        sendMethod: 'airtable',  
        webhookUrl: '',
        
        messages: {
            sending: "Enviando sua mensagem...",
            success: "✅ Mensagem enviada com sucesso! Entraremos em contato em breve.",
            error: "❌ Erro ao enviar mensagem. Tente novamente ou entre em contato por telefone."
        }
    }
}
;

/* 
========================================
INICIALIZAÇÃO DO SITE
========================================
*/

document.addEventListener('DOMContentLoaded', function() {
    initializeSite();
    initializeNavigation();
    initializeForm();
    renderProducts();
});

// Inicializa as informações do site
function initializeSite() {
    const logoElement = document.getElementById('logo-text');
    const heroTitle = document.getElementById('hero-title');
    const footerBusiness = document.getElementById('footer-business');
    
    if (logoElement) logoElement.textContent = siteConfig.businessName;
    if (heroTitle) heroTitle.textContent = siteConfig.businessName;
    if (footerBusiness) footerBusiness.textContent = siteConfig.businessName;
    
    // Atualiza tagline
    const heroTagline = document.getElementById('hero-tagline');
    if (heroTagline) heroTagline.textContent = siteConfig.tagline;
    
    // Atualiza imagem hero
    const heroSection = document.getElementById('home');
    if (heroSection && siteConfig.heroImage) {
        heroSection.style.backgroundImage = `url(${siteConfig.heroImage})`;
    }
    
    // Atualiza informações de contato
    updateContactInfo();
    
    // Atualiza links de redes sociais
    updateSocialLinks();
}

// Atualiza informações de contato
function updateContactInfo() {
    const contactAddress = document.getElementById('contact-address');
    const contactPhone = document.getElementById('contact-phone');
    const contactEmail = document.getElementById('contact-email');
    const contactHours = document.getElementById('contact-hours');
    
    if (contactAddress) contactAddress.textContent = siteConfig.contact.address;
    if (contactPhone) {
        contactPhone.textContent = siteConfig.contact.phone;
        contactPhone.href = `tel:${siteConfig.contact.phone.replace(/\D/g, '')}`;
    }
    if (contactEmail) {
        contactEmail.textContent = siteConfig.contact.email;
        contactEmail.href = `mailto:${siteConfig.contact.email}`;
    }
    if (contactHours) contactHours.textContent = siteConfig.contact.hours;
}

// Atualiza links de redes sociais
function updateSocialLinks() {
    const instagramLink = document.getElementById('social-instagram');
    const facebookLink = document.getElementById('social-facebook');
    
    if (instagramLink) instagramLink.href = siteConfig.social.instagram;
    if (facebookLink) facebookLink.href = siteConfig.social.facebook;
}

/* 
========================================
NAVEGAÇÃO
========================================
*/

function initializeNavigation() {
    // Menu Mobile Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
    
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        });
    });
    
    window.addEventListener('scroll', updateActiveLink);
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active de todos os links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Adiciona active ao link correspondente
            const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerOffset = 80; // Altura do header fixo
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

/* 
========================================
PRODUTOS
========================================
*/

function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    siteConfig.products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">${product.price}</p>
        </div>
    `;
    
    return card;
}

/* 
========================================
FORMULÁRIO DE CONTATO
========================================
*/

function initializeForm() {
    const submitBtn = document.getElementById('submit-btn');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', handleFormSubmit);
    }
    
    // Validação em tempo real (opcional)
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

// Valida um campo individual
function validateField(field) {
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        field.style.borderColor = '#ef4444';
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.style.borderColor = '#ef4444';
            return false;
        }
    }
    
    field.style.borderColor = '#d1d5db';
    return true;
}

// Processa o envio do formulário
function handleFormSubmit(e) {
    if (e) e.preventDefault();
    
    console.log('=== Formulário Clicado ===');
    
    // Obtém os valores do formulário
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const messageField = document.getElementById('message');
    
    if (!nameField || !emailField || !messageField) {
        console.error('Campos do formulário não encontrados!');
        showFormStatus('error', 'Erro no formulário. Recarregue a página.');
        return;
    }
    
    const formData = {
        name: nameField.value.trim(),
        email: emailField.value.trim(),
        phone: phoneField.value.trim(),
        message: messageField.value.trim()
    };
    
    console.log('Dados do formulário:', formData);
    
    // Valida campos obrigatórios
    if (!formData.name || !formData.email || !formData.message) {
        showFormStatus('error', 'Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Valida email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showFormStatus('error', 'Por favor, insira um e-mail válido.');
        return;
    }
    
    // Desabilita botão durante envio
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = siteConfig.formConfig.messages.sending;
    
    // Envia o formulário
    sendFormData(formData)
        .then(() => {
            console.log('✅ Enviado com sucesso!');
            showFormStatus('success', siteConfig.formConfig.messages.success);
            clearForm();
        })
        .catch((error) => {
            console.error('❌ Erro ao enviar:', error);
            showFormStatus('error', siteConfig.formConfig.messages.error);
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Mensagem';
        });
}

// Envia os dados do formulário
function sendFormData(formData) {
    return new Promise((resolve, reject) => {
        const method = siteConfig.formConfig.sendMethod;
        
        console.log('Método de envio:', method);
        
        if (method === 'console') {
            // Modo teste
            console.log('=== DADOS DO FORMULÁRIO ===');
            console.log('Nome:', formData.name);
            console.log('E-mail:', formData.email);
            console.log('Telefone:', formData.phone);
            console.log('Mensagem:', formData.message);
            console.log('===========================');
            setTimeout(() => resolve(), 1500);
            
        } else if (method === 'airtable') {
            sendToAirtable(formData)
                .then(result => resolve(result))
                .catch(error => reject(error));
            
        } else if (method === 'email') {
            // Email
            const subject = encodeURIComponent(`Contato de ${formData.name}`);
            const body = encodeURIComponent(
                `Nome: ${formData.name}\nE-mail: ${formData.email}\nTelefone: ${formData.phone}\n\nMensagem:\n${formData.message}`
            );
            window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
            setTimeout(() => resolve(), 1000);
            
        } else if (method === 'webhook' && siteConfig.formConfig.webhookUrl) {
            // Webhook genérico
            fetch(siteConfig.formConfig.webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.ok) resolve();
                else reject(new Error('Erro no servidor'));
            })
            .catch(error => reject(error));
            
        } else {
            reject(new Error('Método de envio não configurado'));
        }
    });
}

// Exibe mensagem de status do formulário
function showFormStatus(type, message) {
    const statusDiv = document.getElementById('form-status');
    if (!statusDiv) {
        console.error('Elemento form-status não encontrado!');
        return;
    }
    
    statusDiv.textContent = message;
    statusDiv.className = `form-status ${type}`;
    statusDiv.style.display = 'block';
    
    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 5000);
}

// Limpa o formulário
function clearForm() {
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const messageField = document.getElementById('message');
    
    if (nameField) nameField.value = '';
    if (emailField) emailField.value = '';
    if (phoneField) phoneField.value = '';
    if (messageField) messageField.value = '';
}

/* 

/* 
========================================
UTILITÁRIOS
========================================
*/

// Formata número de telefone
function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}

function validateCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;
    
    let sum = 0;
    let remainder;
    
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
}
// Integração com Airtable
async function sendToAirtable(formData) {
    console.log('=== DEBUG COMPLETO - AIRTABLE ===');
    console.log('1. formData recebido:', formData);
    console.log('2. Tipo:', typeof formData);
    console.log('3. Keys:', formData ? Object.keys(formData) : 'undefined');
    console.log('4. name:', formData?.name);
    console.log('5. email:', formData?.email);
    console.log('6. phone:', formData?.phone);
    console.log('7. message:', formData?.message);
    
    if (!siteConfig.airtable) {
        console.error('❌ Configuração do Airtable não encontrada!');
        throw new Error('Airtable não configurado no siteConfig');
    }
    
    const { token, baseId, tableName } = siteConfig.airtable;
    
    console.log('8. Token:', token ? '✓ Configurado' : '✗ FALTANDO');
    console.log('9. Base ID:', baseId || '✗ FALTANDO');
    console.log('10. Table Name:', tableName || '✗ FALTANDO');
    
    if (!token || !baseId || !tableName) {
        throw new Error('Credenciais do Airtable incompletas');
    }
    
    try {
        const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
        console.log('11. URL da API:', url);
        
        const nameValue = String(formData.name || '').trim();
        const emailValue = String(formData.email || '').trim();
        const phoneValue = String(formData.phone || '').trim();
        const messageValue = String(formData.message || '').trim();
        
        console.log('12. Valores processados:');
        console.log('    - Name:', nameValue);
        console.log('    - Email:', emailValue);
        console.log('    - Telefone:', phoneValue);
        console.log('    - Mensagem:', messageValue);
        
        if (!nameValue || !emailValue || !messageValue) {
            console.error('❌ Dados obrigatórios vazios!');
            throw new Error('Nome, email ou mensagem estão vazios');
        }
        
        const payload = {
            fields: {
               'Name': formData.name,
        'Email': formData.email,
        'Telefone': formData.phone || '',
        'Mensagem': formData.message
            }
        };
        
        console.log('13. Payload FINAL:', JSON.stringify(payload, null, 2));
        
        const requestBody = JSON.stringify(payload);
        console.log('14. Request body (string):', requestBody);
        console.log('15. Request body length:', requestBody.length);
        
        console.log('16. Enviando requisição...');
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: requestBody
        });
        
        console.log('17. Status HTTP:', response.status);
        console.log('18. Response OK?:', response.ok);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('19. Erro (texto):', errorText);
            
            let errorData;
            try {
                errorData = JSON.parse(errorText);
                console.error('20. Erro (JSON):', errorData);
            } catch (e) {
                console.error('20. Não foi possível parsear como JSON');
            }
            
            throw new Error(`Airtable erro ${response.status}: ${errorText}`);
        }
        
        const data = await response.json();
        console.log('21. ✅ SUCESSO TOTAL!');
        console.log('22. Resposta do Airtable:', data);
        console.log('================================');
        
        return { success: true, data };
        
    } catch (error) {
        console.error('❌ ERRO CAPTURADO:', error);
        console.error('❌ Mensagem:', error.message);
        console.error('❌ Stack:', error.stack);
        throw error;
    }
}