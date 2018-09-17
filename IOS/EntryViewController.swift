//
//  EntryViewController.swift
//  hwtestSplit
//
//  Created by 史向阳 on 2017/11/28.
//  Copyright © 2017年 史向阳. All rights reserved.
//

import UIKit
import os.log
import Alamofire
import SwiftyJSON
import SearchTextField
import EasyToast
class EntryViewController: UIViewController , UIPickerViewDataSource , UIPickerViewDelegate , UITableViewDelegate , UITableViewDataSource {

    //MARK binds
    @IBOutlet weak var stockquery: SearchTextField!
    @IBOutlet weak var querybutton: UIButton!
    @IBOutlet weak var clearbutton: UIButton!
    @IBOutlet weak var firstPickerView: UIPickerView!
    @IBOutlet weak var secondPickerView: UIPickerView!
    @IBOutlet weak var titlelabel: UILabel!
    @IBOutlet weak var mytableview: UITableView!
    @IBOutlet weak var switchbutton: UISwitch!
    
    //MARK: data
    let firstgroup = [ "Default","Symbol","Change","ChangePercent","Close" ]
    let secondgroup = [ "Descending","Ascending" ]
    var firstindex = "Default"
    var secondindex = "Descending"
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        if (pickerView.tag == 0){
            return firstgroup[row]
        }
        else{
            return secondgroup[row]
        }
    }
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        if (pickerView.tag == 0){
            return firstgroup.count
        }
        else{
            return secondgroup.count
        }
    }
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        if (pickerView.tag == 0){
            firstindex = firstgroup[row]
        }
        if (pickerView.tag == 1){
            secondindex = secondgroup[row]
        }
        //"Default","Symbol","Change","ChangePercent","Close"
        if (firstindex == "Change"){
            favour.sort { (s1, s2) -> Bool in
                let change1 = (s1[2] as NSString).floatValue
                let change2 = (s2[2] as NSString).floatValue
                return change1 > change2
            }
        }
        else if (firstindex == "ChangePercent"){
            favour.sort { (s1, s2) -> Bool in
                let ss1 = s1[2].characters.split(separator:"(").map(String.init)[1]
                let ss2 = s2[2].characters.split(separator:"(").map(String.init)[1]
                let changepercent1 = (ss1 as NSString).floatValue
                let changepercent2 = (ss2 as NSString).floatValue
                return changepercent1 > changepercent2
            }
        }
        else if (firstindex == "Close"){
            favour.sort { (s1, s2) -> Bool in
                let close1 = s1[1]
                let startSlicingIndex1 = close1.index(close1.startIndex, offsetBy: 1)
                let subvalues1 = close1[startSlicingIndex1..<close1.endIndex]
                let Close1 = (subvalues1 as NSString).floatValue
                let close2 = s2[1]
                let startSlicingIndex2 = close2.index(close2.startIndex, offsetBy: 1)
                let subvalues2 = close2[startSlicingIndex2..<close2.endIndex]
                let Close2 = (subvalues2 as NSString).floatValue
                return Close1 > Close2
            }
        }
        else{//default and symbol
            favour.sort { (s1, s2) -> Bool in
                return s1[0] > s2[0]
            }
        }
        if (secondindex == "Ascending"){
            favour.reverse()
        }
        mytableview.reloadData()
        
    }
    func pickerView(_ pickerView: UIPickerView, rowHeightForComponent component: Int) -> CGFloat {
        return 20
    }
    
    var favour = [["ABAX","$47.04","0.24(0.51%)"],
                ["AAPL","$156.25","0.27(0.17%)"],
                ["GOOG","$988.20","-3.75(0.38%)"]]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        //let nib = UINib(nibName: "InfoViewCell", bundle: nil)
        //mytableview.register(nib, forCellReuseIdentifier: "infoViewCell")
        // Do any additional setup after loading the view.
        //mytableview.reloadData()
        stockquery.theme.cellHeight = 50
        stockquery.maxNumberOfResults = 5
        stockquery.maxResultsListHeight = 200
        stockquery.userStoppedTypingHandler = {
            if let criteria = self.stockquery.text {
                if criteria.characters.count > 1 {
                    let mainurl = "http://localhost:8081/"
                    let newsurl = "\(mainurl)auto?symbol=\(criteria)"
                    Alamofire.request(newsurl, method: .get).responseJSON {
                        response in
                        guard let J = response.result.value else { return }
                        //print(J)
                        let jsonObj = JSON(J)
                        var filteritems = [SearchTextFieldItem]()
                        for (_,subJson):(String, JSON) in jsonObj {
                            let symbol = subJson["Symbol"].string ?? ""
                            let subname = subJson["Name"].string ?? ""
                            let market = subJson["Exchange"].string ?? ""
                            let item = SearchTextFieldItem(title: symbol,subtitle: "\(subname) \(market)")
                            filteritems.append(item)
                        }
                        self.stockquery.filterItems(filteritems)
                    }
                }
            }
        }
        
        // Handle item selection - Default behaviour: item title set to the text field
        stockquery.itemSelectionHandler = { filteredResults, itemPosition in
            // Just in case you need the item position
            let item = filteredResults[itemPosition]
            print("Item at position \(itemPosition): \(item.title)")
            
            // Do whatever you want with the picked item
            self.stockquery.text = item.title
        }
        
    }

    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return favour.count
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cellIdentifier = "infoViewCell"
        guard let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as? InfoViewCell  else {
            fatalError("The dequeued cell is not an instance of TableViewCell.")
        }
        // Fetches the appropriate meal for the data source layout.
        let str = favour[indexPath.row]
        cell.label1.text = str[0]
        cell.label2.text = str[1]
        cell.label3.text = str[2]
        let checkifgreen = (str[2] as NSString).floatValue
        if (checkifgreen > 0){
            cell.label3.textColor = UIColor.green
        }
        else{
            cell.label3.textColor = UIColor.red
        }
        return cell
    }
    // Override to support conditional editing of the table view.
    func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    // Override to support editing the table view.
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            favour.remove(at: indexPath.row)
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        super.prepare(for: segue, sender: sender)
        switch(segue.identifier ?? "") {
        case "quotequery":
            guard let stockDetailViewController = segue.destination as? ViewController else {
                fatalError("Unexpected destination: \(segue.destination)")
            }
            let symbolinput = stockquery.text ?? ""
            var ifFavour = 0
            for i in favour{
                if ( i[0] == symbolinput ){
                    ifFavour = 1
                }
            }
            let StockInfo = stockinfo(symbol: symbolinput, change: "", close: "", iffavour: ifFavour)
            stockDetailViewController.StockInfo = StockInfo
        case "cellquery":
            guard let stockDetailViewController = segue.destination as? ViewController else {
                fatalError("Unexpected destination: \(segue.destination)")
            }
            guard let selectedViewCell = sender as? InfoViewCell else {
                fatalError("Unexpected sender: \(String(describing: sender))")
            }
            guard let indexPath = mytableview.indexPath(for: selectedViewCell) else {
                fatalError("The selected cell is not being displayed by the table")
            }
            let symbolinput = favour[indexPath.row][0]
            let StockInfo = stockinfo(symbol: symbolinput, change: "", close: "", iffavour: 1)
            stockDetailViewController.StockInfo = StockInfo
        default:
            fatalError("Unexpected Segue Identifier; \(String(describing: segue.identifier))")
        }
    }
    override func shouldPerformSegue(withIdentifier identifier: String, sender: Any?) -> Bool {
        if identifier == "quotequery" && stockquery.text == ""{
            self.view.showToast("Dont enter empty query please", position: .bottom, popTime: 5, dismissOnTap: false)
            return false
        }
        else{
            return true
        }
    }
    
    
    //MARK action
    @IBAction func clearStockQuery(_ sender: UIButton) {
        stockquery.text = ""
    }
    @IBAction func unwindToMealList(sender: UIStoryboardSegue) {
        if let sourceViewController = sender.source as? ViewController, let StockInfo = sourceViewController.StockInfo {
            // Add a new meal.
            update()
            let newIndexPath = IndexPath(row: favour.count, section: 0)
            let meal = [StockInfo.symbol,"$\(StockInfo.close)",StockInfo.change]
            if(StockInfo.iffavourlist == 1){
                for i in favour{
                    if ( i[0] == StockInfo.symbol ){
                        return
                    }
                }
            favour.append(meal)
            mytableview.insertRows(at: [newIndexPath], with: .automatic)
            }
            else{
                for i in 0..<favour.count{
                    if ( favour[i][0] == StockInfo.symbol ){
                        favour.remove(at: i)
                        let indexPathPicker = IndexPath(row: i, section: 0)
                        mytableview.deleteRows(at: [indexPathPicker], with: .fade)
                        break
                    }
                }
            }
        }
    }
    
    

    @IBAction func refreshclick(_ sender: UIButton) {
        update()
    }
    
    func update(){
        let mainurl = "http://localhost:8081/"
        
        //var favour = [["ABAX","$47.04","0.24(0.51%)"],
        
        for i in 0..<favour.count{
            let newsurl = "\(mainurl)symbol?symbol=\(favour[i][0])"
            Alamofire.request(newsurl, method: .get).responseJSON {
                response in
                guard let J = response.result.value else { return }
                print(J)
                let JSONobj = JSON(J)
                let change = JSONobj["change"].string ?? ""
                let price = JSONobj["price"].string ?? ""
                let changrate = JSONobj["changerate"].string ?? ""
                self.favour[i] = [ self.favour[i][0], "$\(price)" , "\(change)("+changrate+"%)" ]
                
                self.mytableview.reloadData()
            }
        }
    }
    
    var timer = Timer()
    @IBAction func changeswitch(_ sender: UISwitch) {
        if sender.isOn == true{
            timer = Timer.scheduledTimer(timeInterval: 5, target: self, selector: (#selector(EntryViewController.update)), userInfo: nil, repeats: true)
        }
        else{
            timer.invalidate()
        }
    }
    
}
