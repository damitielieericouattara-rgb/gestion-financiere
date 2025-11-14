let pendingTransactions = [
            { id: 'TXN-003', user: 'Amara Koné', type: 'Entrée', montant: 200000, motif: 'Paiement client ABC', date: '2025-11-06 11:15' },
            { id: 'TXN-005', user: 'Fatou Diallo', type: 'Entrée', montant: 300000, motif: 'Subvention projet', date: '2025-11-05 10:00' },
            { id: 'TXN-007', user: 'Ibrahim Traoré', type: 'Sortie', montant: 85000, motif: 'Achat équipement', date: '2025-11-07 08:30' },
            { id: 'TXN-008', user: 'Amina Ouattara', type: 'Sortie', montant: 45000, motif: 'Frais de déplacement', date: '2025-11-07 09:45' },
            { id: 'TXN-009', user: 'Moussa Sangaré', type: 'Entrée', montant: 175000, motif: 'Vente marchandises', date: '2025-11-07 10:00' },
        ];

        let currentAction = null;
        let currentTransactionId = null;

        function renderPendingTransactions() {
            const tbody = document.getElementById('pendingTable');
            const emptyState = document.getElementById('emptyState');
            const countElement = document.getElementById('countPending');
            
            if (pendingTransactions.length === 0) {
                tbody.innerHTML = '';
                emptyState.classList.remove('hidden');
                countElement.textContent = 'Aucune transaction en attente';
                return;
            }

            countElement.textContent = `${pendingTransactions.length} transaction${pendingTransactions.length > 1 ? 's' : ''} en attente`;
            emptyState.classList.add('hidden');
            tbody.innerHTML = pendingTransactions.map(tx => `
                <tr class="hover:bg-gray-50 transition">
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">${tx.id}</td>
                    <td class="px-6 py-4 text-sm text-gray-900">${tx.user}</td>
                    <td class="px-6 py-4 text-sm">
                        <span class="px-3 py-1 rounded-full text-xs font-semibold ${tx.type === 'Entrée' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                            ${tx.type}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-sm font-semibold text-gray-900">${tx.montant.toLocaleString()} FCFA</td>
                    <td class="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">${tx.motif}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${tx.date}</td>
                    <td class="px-6 py-4 text-sm">
                        <div class="flex justify-center space-x-2">
                            <button onclick="showConfirmModal('valider', '${tx.id}')" 
                                class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition font-semibold">
                                Valider
                            </button>
                            <button onclick="showConfirmModal('refuser', '${tx.id}')" 
                                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold">
                                Refuser
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }

        function showConfirmModal(action, txId) {
            currentAction = action;
            currentTransactionId = txId;
            
            const modal = document.getElementById('confirmModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalMessage = document.getElementById('modalMessage');
            const confirmBtn = document.getElementById('confirmBtn');
            
            const tx = pendingTransactions.find(t => t.id === txId);
            
            if (action === 'valider') {
                modalTitle.textContent = 'Valider la transaction';
                modalMessage.textContent = `Êtes-vous sûr de vouloir valider la transaction ${txId} de ${tx.montant.toLocaleString()} FCFA ?`;
                confirmBtn.className = 'flex-1 bg-green-500 hover:bg-green-600 py-2 px-4 rounded-lg font-semibold text-white transition';
                confirmBtn.textContent = 'Valider';
            } else {
                modalTitle.textContent = 'Refuser la transaction';
                modalMessage.textContent = `Êtes-vous sûr de vouloir refuser la transaction ${txId} de ${tx.montant.toLocaleString()} FCFA ?`;
                confirmBtn.className = 'flex-1 bg-red-500 hover:bg-red-600 py-2 px-4 rounded-lg font-semibold text-white transition';
                confirmBtn.textContent = 'Refuser';
            }
            
            modal.classList.remove('hidden');
        }

        function closeModal() {
            document.getElementById('confirmModal').classList.add('hidden');
            currentAction = null;
            currentTransactionId = null;
        }

        function confirmAction() {
            const tx = pendingTransactions.find(t => t.id === currentTransactionId);
            
            // ⭐ UTILISER LES NOTIFICATIONS AU LIEU DES DIV MESSAGES ⭐
            if (currentAction === 'valider') {
                // Notification de succès
                notifyTransactionValidated(currentTransactionId);
            } else {
                // Notification de refus
                notifyTransactionRejected(currentTransactionId);
            }
            
            // Retirer la transaction de la liste
            pendingTransactions = pendingTransactions.filter(t => t.id !== currentTransactionId);
            renderPendingTransactions();
            
            closeModal();
        }

        // Initialiser au chargement
        renderPendingTransactions();

        // ⭐ SIMULER L'ARRIVÉE DE NOUVELLES DEMANDES (pour démonstration) ⭐
        // En production, cela viendrait du back-end via AJAX/WebSocket
        setTimeout(() => {
            notifyNewRequest('Doumbia ali', 250000);
        }, 10000); // Après 10 secondes