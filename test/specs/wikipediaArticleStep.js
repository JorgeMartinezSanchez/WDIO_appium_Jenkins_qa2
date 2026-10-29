describe('Wikipedia App Test', () => {
    it('should allow searching for an article', async () => {
        // Ejemplo de interacción con la pantalla de bienvenida/skip de Wikipedia
        const skipButton = await $('id:fragment_onboarding_skip_button');
        if (await skipButton.isDisplayed()) {
            await skipButton.click();
        }

        // Buscar un término
        const searchContainer = await $('id:search_container');
        await searchContainer.click();

        const searchInput = await $('id:search_src_text');
        await searchInput.setValue('BrowserStack');

        // Verificar resultados
        const results = await $$('id:page_list_item_title');
        expect(results.length).toBeGreaterThan(0);
    });
});