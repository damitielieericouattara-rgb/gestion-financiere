document.getElementById('transactionForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const type = document.querySelector('input[name="type"]:checked').value;
            const montant = document.getElementById('montant').value;
            const motif = document.getElementById('motif').value;
            const messageDiv = document.getElementById('message');

            if (montant && motif) {
                messageDiv.className = 'mt-6 p-4 rounded-lg bg-green-100 border border-green-300 text-green-800';
                messageDiv.innerHTML = `
                    <div class="flex items-center">
                        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div>
                            <p class="font-semibold">Transaction soumise avec succès !</p>
                            <p class="text-sm mt-1">Votre demande de ${type} de ${parseInt(montant).toLocaleString()} FCFA est en attente de validation.</p>
                        </div>
                    </div>
                `;
                messageDiv.classList.remove('hidden');
                
                this.reset();
                
                setTimeout(() => {
                    window.location.href = 'mes_transactions.html';
                }, 2000);
            }
        });