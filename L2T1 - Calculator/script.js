document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let answer = 0;

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            switch (value) {
                case 'del':
                    currentInput = currentInput.slice(0, -1);
                    break;
                case 'clear':
                    currentInput = '';
                    break;
                case 'ans':
                    currentInput += answer;
                    break;
                case 'ENTER':
                    try {
                        answer = eval(currentInput.replace('×', '*').replace('÷', '/').replace('√', 'Math.sqrt'));
                        currentInput = answer;
                    } catch {
                        currentInput = 'Error';
                    }
                    break;
                case '%':
                    currentInput += '/100';
                    break;
                default:
                    currentInput += value;
                    break;
            }

            display.value = currentInput;
        });
    });
});
