import os

def ViewContent(path):
    with os.scandir(path) as files:
        for file in files:
            print(file.name)

def RenameFile(path):
    print('Введите название файла, который нужно переименовать:')
    name = input()
    old = path + "/" + name
    print('Введите новое название:')
    name = input()
    new = path + "/" + name
    os.rename(old, new)

def WriteInFile(path):
    print('Введите название файла, в который нужно что-то записать:')
    name = input()
    file_name = path + "/" + name
    print('Введите, что нужно записать в файл:')
    file_input = input()
    with open(file_name, "a") as file:
        file.write("\n" + file_input)

def ReadFile(path):
    print('Введите название файла, который требуется прочитать:')
    name = input()
    file_name = path + "/" + name
    if(os.path.exists(file_name)):
        with open(file_name, "r") as file:
            line = file.readline()
            while line:
                print(line, end="")
                line = file.readline()
            print()
    else:
        print('Файла не существует')

def CreateFile(path):
    print('Введите название создаваемого файла:')
    name = input()
    file_name = path + "/" + name
    if(os.path.exists(file_name)):
        print('Файл уже существует')
    else:
        open(file_name, "w")
        print('Файл успешно создан')

def DeleteFile(path):
    print('Введите название файла, который нужно удалить:')
    name = input()
    file_name = path + "/" + name
    if(os.path.exists(file_name)):
        os.remove((file_name))
        print('Файл удален')
    else:
        print('Файл не существует')

def SortFiles(path):
    sort_list = os.listdir(path)
    print('Выберите требуемую сортировку: \n 1. В алфавитном порядке; \n 2. В обратном порядке.')
    answer = int(input())
    if(answer == 1):
        for file in sorted(sort_list, reverse = False):
            print(file)
    elif(answer == 2):
        for file in sorted(sort_list, reverse = True):
            print(file)
    else:
        print('Неверный ввод.')

def Start():
    answer = -1
    while(answer != 0):
        print('Список возможных действий: ')
        print('1. Посмотреть содержимое директории;')
        print('2. Изменить название;')
        print('3. Создать новый файл;')
        print('4. Чтение файла;')
        print('5. Запись в файл;')
        print('6. Удалить файл;')
        print('7. Сортировка файлов;')
        print('0. Выйти из программы.')
        time.sleep(0.5)
        print('Введите желаемое действие: ')
        answer = int(input())
        if(answer == 1):
            ViewContent(path)
        elif(answer == 2):
            RenameFile(path)
        elif (answer == 3):
            CreateFile(path)
        elif(answer == 4):
            ReadFile(path)
        elif(answer == 5):
            WriteInFile(path)
        elif (answer == 6):
            DeleteFile(path)
        elif (answer == 7):
            SortFiles(path)

print('Введите путь, по которому будут производится действия:')
path = input()
if(os.path.exists(path)):
    Start()
else:
    print('Путь не найден')