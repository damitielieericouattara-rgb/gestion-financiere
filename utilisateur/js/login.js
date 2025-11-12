// document.getElementById('loginForm').addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             const login = document.getElementById('login').value;
//             const password = document.getElementById('password').value;
//             const messageDiv = document.getElementById('message');

//             // Simulation de connexion (à remplacer par appel PHP)
//             if (login && password) {
//                 messageDiv.className = 'mt-4 p-3 rounded-lg bg-green-100 text-green-700';
//                 messageDiv.textContent = 'Connexion réussie...';
//                 messageDiv.classList.remove('hidden');

//                 // Simulation redirection selon le rôle
//                 setTimeout(() => {
//                     if (login.toLowerCase().includes('admin')) {
//                         window.location.href = '../admin/dashboard_admin.html';
//                     } else {
//                         window.location.href = 'mes_transactions.html';
//                     }
//                 }, 1000);
//             } else {
//                 messageDiv.className = 'mt-4 p-3 rounded-lg bg-red-100 text-red-700';
//                 messageDiv.textContent = 'Identifiant ou mot de passe incorrect';
//                 messageDiv.classList.remove('hidden');
//             }
//         });



        // Gestion de la sélection du type de compte
        function selectAccountType(type) {
            const userBtn = document.getElementById('btn-user');
            const adminBtn = document.getElementById('btn-admin');
            const accountTypeInput = document.getElementById('accountType');

            if (type === 'user') {
                userBtn.classList.remove('border-gray-300', 'bg-white', 'text-gray-700');
                userBtn.classList.add('border-green-500', 'bg-green-50', 'text-green-700');
                adminBtn.classList.remove('border-green-500', 'bg-green-50', 'text-green-700');
                adminBtn.classList.add('border-gray-300', 'bg-white', 'text-gray-700');
            } else {
                adminBtn.classList.remove('border-gray-300', 'bg-white', 'text-gray-700');
                adminBtn.classList.add('border-green-500', 'bg-green-50', 'text-green-700');
                userBtn.classList.remove('border-green-500', 'bg-green-50', 'text-green-700');
                userBtn.classList.add('border-gray-300', 'bg-white', 'text-gray-700');
            }

            accountTypeInput.value = type;
        }

        // Gestion du formulaire de connexion
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const login = document.getElementById('login').value;
            const password = document.getElementById('password').value;
            const accountType = document.getElementById('accountType').value;
            const remember = document.getElementById('remember').checked;
            const messageDiv = document.getElementById('message');

            // Simulation de connexion
            messageDiv.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700');
            messageDiv.classList.add('bg-blue-100', 'text-blue-700');
            messageDiv.textContent = 'Connexion en cours...';

            // Simulation d'un délai de connexion
            setTimeout(() => {
                if (login && password) {
                    messageDiv.classList.remove('bg-blue-100', 'text-blue-700');
                    messageDiv.classList.add('bg-green-100', 'text-green-700');
                    messageDiv.innerHTML = `
                        <div class="flex items-center space-x-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Connexion réussie en tant que ${accountType === 'admin' ? 'Administrateur' : 'Utilisateur'} !</span>
                        </div>
                    `;
                    
                    // Redirection vers les pages indiquer après 1.5 secondes
                    setTimeout(() => {
                        if (accountType === 'admin') {
                            window.location.href = '../admin/dashboard_admin.html';
                        } else {
                            window.location.href = '../utilisateur/mes_transactions.html';
                        }
                    }, 1500);
                } else {
                    messageDiv.classList.remove('bg-blue-100', 'text-blue-700');
                    messageDiv.classList.add('bg-red-100', 'text-red-700');
                    messageDiv.innerHTML = `
                        <div class="flex items-center space-x-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span>Identifiant ou mot de passe incorrect.</span>
                        </div>
                    `;
                }
            }, 1000);
        });