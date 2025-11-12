document.getElementById('profilForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const msg = document.getElementById('profilMessage');
            msg.className = 'mt-4 p-3 rounded-lg bg-green-100 text-green-700';
            msg.textContent = 'Profil mis à jour avec succès !';
            msg.classList.remove('hidden');
            setTimeout(() => msg.classList.add('hidden'), 3000);
        });

        document.getElementById('passwordForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const newPass = document.getElementById('newPassword').value;
            const confirmPass = document.getElementById('confirmPassword').value;
            const msg = document.getElementById('passwordMessage');

            if (newPass !== confirmPass) {
                msg.className = 'mt-4 p-3 rounded-lg bg-red-100 text-red-700';
                msg.textContent = 'Les mots de passe ne correspondent pas';
            } else if (newPass.length < 6) {
                msg.className = 'mt-4 p-3 rounded-lg bg-red-100 text-red-700';
                msg.textContent = 'Le mot de passe doit contenir au moins 6 caractères';
            } else {
                msg.className = 'mt-4 p-3 rounded-lg bg-green-100 text-green-700';
                msg.textContent = 'Mot de passe modifié avec succès !';
                this.reset();
            }
            msg.classList.remove('hidden');
            setTimeout(() => msg.classList.add('hidden'), 3000);
        });