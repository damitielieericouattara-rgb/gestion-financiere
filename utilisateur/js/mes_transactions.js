// Données simulées (à remplacer par fetch PHP)
        const transactions = [
            { id: 'TXN-001', type: 'Entrée', montant: 150000, motif: 'Vente de produits', date: '2025-11-07 09:30', statut: 'validée' },
            { id: 'TXN-002', type: 'Sortie', montant: 75000, motif: 'Achat de fournitures', date: '2025-11-06 14:20', statut: 'validée' },
            { id: 'TXN-003', type: 'Entrée', montant: 200000, motif: 'Paiement client ABC', date: '2025-11-06 11:15', statut: 'en attente' },
            { id: 'TXN-004', type: 'Sortie', montant: 50000, motif: 'Frais de transport', date: '2025-11-05 16:45', statut: 'refusée' },
            { id: 'TXN-005', type: 'Entrée', montant: 300000, motif: 'Subvention projet', date: '2025-11-05 10:00', statut: 'en attente' },
            { id: 'TXN-006', type: 'Sortie', montant: 120000, motif: 'Salaire personnel', date: '2025-11-04 09:00', statut: 'validée' },
        ];

        function getStatutClass(statut) {
            switch(statut) {
                case 'validée': return 'bg-green-100 text-green-800';
                case 'en attente': return 'bg-yellow-100 text-yellow-800';
                case 'refusée': return 'bg-red-100 text-red-800';
                default: return 'bg-gray-100 text-gray-800';
            }
        }

        function renderTransactions() {
            const tbody = document.getElementById('transactionsTable');
            tbody.innerHTML = transactions.map(tx => `
                <tr class="hover:bg-gray-50 transition">
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">${tx.id}</td>
                    <td class="px-6 py-4 text-sm">
                        <span class="px-3 py-1 rounded-full text-xs font-semibold ${tx.type === 'Entrée' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                            ${tx.type}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-sm font-semibold text-gray-900">${tx.montant.toLocaleString()} FCFA</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${tx.motif}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${tx.date}</td>
                    <td class="px-6 py-4 text-sm">
                        <span class="px-3 py-1 rounded-full text-xs font-semibold ${getStatutClass(tx.statut)}">
                            ${tx.statut.charAt(0).toUpperCase() + tx.statut.slice(1)}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-sm">
                        ${tx.statut === 'validée' ? 
                            `<a href="recu.html?id=${tx.id}" class="text-green-600 hover:text-green-800 font-semibold">Télécharger reçu</a>` : 
                            '<span class="text-gray-400">-</span>'}
                    </td>
                </tr>
            `).join('');
        }

        renderTransactions();